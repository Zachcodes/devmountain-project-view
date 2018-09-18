require('dotenv').config({ path: __dirname + '/../.env'})
const axios = require('axios')
const fs = require('fs')
const errorFile = __dirname + '/../logging/deadLinks.txt'
const loggingFolder = __dirname + '/../logging'
const _ = require('underscore')

module.exports = {

    averageRatingExecution: (db) => {
        //This gets the average ratings for every project that doesn't have an average record in the db already
        db.projects.get_avg_prj_no_avg().then(prjIdAvg => {
            if(prjIdAvg.length) {
                db.average_project_ratings.insert(prjIdAvg).then( response => {
                    db.projects.get_avg_prj_with_avg().then(prjIdAvg => {
                        let promiseArr = []
                        prjIdAvg.forEach(prj => {
                            let {average_rating, id} = prjIdAvg;
                            promiseArr.push(db.update_project_average_rating({id, average_rating}))
                        })
                        Promise.all(promiseArr).then( values => {
                            chooseDailyFeatured(db)
                        })
                    })
                })
            }
            else {
                db.projects.get_avg_prj_with_avg().then(prjIdAvg => {
                    let promiseArr = []
                    prjIdAvg.forEach(prj => {
                        let {average_rating, id} = prj;
                        promiseArr.push(db.update_project_average_rating({id, average_rating}))
                    })
                    Promise.all(promiseArr).then( values => {
                        chooseDailyFeatured(db)
                    })
                })
            }

        })

        function chooseDailyFeatured(db) {
            let oneWeek = new Date(new Date().getTime() - (60*60*24*7*1000))
            let oneWeekDay = oneWeek.getDate()
            let oneWeekYear = oneWeek.getFullYear()
            let oneWeekMonth = oneWeek.getMonth() + 1;
            let oneWeekString = `${oneWeekYear}-${oneWeekMonth}-${oneWeekDay}`
            //This will get a project that has not been featured or has been featured over a week ago
            db.projects.get_daily_project_random({oneWeekString}).then(featuredProject => {
                if(featuredProject.length) {
                    let {id} = featuredProject[0]
                    createDaily(id)
                }
                else {
                    db.projects.get_daily_project_featured_previous({oneWeekString}).then(featuredProject => {
                        let {id} = featuredProject[0]
                        createDaily(id)
                    })
                }

                function createDaily(id) {
                    let todaysDate = new Date()
                    let Day = todaysDate.getDate()
                    let Year = todaysDate.getFullYear()
                    let Month = todaysDate.getMonth() + 1;
                    let dateString = `${Year}-${Month}-${Day}`
                    db.projects.create_daily_featured_project({id, dateString}).then(res => {
                        db.projects.set_project_last_featured_date({id, dateString})
                    })
                }
        
            })
        }

    },

    checkLinkStatusExecution: (db) => {
        let completed = {}
        let changedProjectsActiveIds = []
        let changedProjectsBrokenIds = []
    
        function writeErrorToFile(errorString) {
            fs.appendFile(errorFile, errorString, function (err) {
                if (err) throw err;
              });
        }
        function checkFinished() {
            let finished = true;
            for(let key in completed) {
                if(!completed[key]) finished = false
            }
            if(finished) {
                if(changedProjectsBrokenIds.length) {
                    db.projects.update({id: changedProjectsBrokenIds}, {active: false})
                    .catch(err => writeErrorToFile('\n Could not update broken'))
                }
                if(changedProjectsActiveIds.length) {
                  db.projects.update({id: changedProjectsActiveIds}, {active: true}) 
                  .catch(err => writeErrorToFile('\n Could not update active'))
                }
            }
        }
    
        db.projects.get_project_links().then( links => {
            for(let i = 0; i < links.length; i++) {
                completed[i] = false;
                if(links[i].url) {
                    axios.get(links[i].url).then(response => {
                        completed[i] = true;
                        if(response.status === 200) {
                            if(!links[i].active) {
                                changedProjectsActiveIds.push(links[i].id)
                            }
                        }
                        checkFinished()
                    })
                    .catch( err => {
                        if(links[i].active) {
                            changedProjectsBrokenIds.push(links[i].id)
                        }  
                        checkFinished()
                    })
                } 
                else {
                    completed[i] = true;
                    if(links[i].active) {
                        changedProjectsBrokenIds.push(links[i].id)
                    } 
                    checkFinished()
                }
            }
        })
        .catch(err => writeErrorToFile('\n Could not connect to database'))
        
    },

    cleanUpLogging: () => {
        
        fs.readdir(loggingFolder, (err, files) => {
            if(err) return;
            if(!files.length) return;
            files.forEach(file => {
                let filePath = __dirname + `/../logging/${file}`;
                fs.unlink(filePath, (err) => {
                    fs.openSync(filePath, 'w')
                })
            })
        })

    },

    async grabCohortsFromDevMountain(db) {
        let cohorts = await db.cohorts.get_cohort_ids()
        let ownedExternalCohortIds = cohorts.map(cohort => cohort.external_cohort_id)
        let devMountainResponse = await axios.get(process.env.DEVMOUNTAIN_DOMAIN, {
                                            headers: {
                                                authorization: process.env.THIRD_PARTY_AUTH
                                            }
                                        })
        let {data} = devMountainResponse;
        let externalCohortIds = data.map(cohort => cohort.id)
        let noMatchDevMountainIds = _.difference(externalCohortIds, ownedExternalCohortIds)
        //This will only run if there is an id that doesn't exist in our db
        if(noMatchDevMountainIds.length) {
            let formattedCohorts = [];
            data.forEach(cohort => {
                if(noMatchDevMountainIds.indexOf(cohort.id) !== -1) {
                    let cohort_type;
                    switch(cohort.subject) {
                        case 'webdev':
                            cohort_type = 1;
                            break;
                        case 'ios':
                            cohort_type = 3;
                            break;
                        case 'salesforce-admin':
                            cohort_type = 5;
                            break;
                        case 'qa':
                            cohort_type = 4;
                            break;
                        case 'ux':
                            cohort_type = 2;
                            break;
                        case 'sf':
                            cohort_type = 5;
                            break;
                        case 'dgm':
                            cohort_type = null;
                            break;
                        case 'online':
                            cohort_type = 6;
                            break;
                        default: 
                            cohort_type = null;
                    }
                    let formattedCohort = {
                        name: cohort.short_name,
                        cohort_type,
                        external_cohort_id: cohort.id,
                        type: cohort.type
                    }
                    formattedCohorts.push(formattedCohort)
                }
            })
            let res = await db.cohorts.insert(formattedCohorts);
   
        }
        
    }

}