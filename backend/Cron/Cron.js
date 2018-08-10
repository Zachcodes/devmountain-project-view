require('dotenv').config({ path: __dirname + '/../.env'})
const axios = require('axios')
const fs = require('fs')
const errorFile = __dirname + '../logging/deadLinks.txt'

module.exports = {

    averageRatingExecution: (db) => {
        //This gets the average ratings for every project that doesn't have an average record in the db already
        db.get_avg_prj_no_avg().then(prjIdAvg => {
            if(prjIdAvg.length) {
                db.average_project_ratings.insert(prjIdAvg).then( response => {
                    db.get_avg_prj_with_avg().then(prjIdAvg => {
                        let promiseArr = []
                        prjIdAvg.forEach(prj => {
                            let {average_rating, id} = prjIdAvg;
                            promiseArr.push(db.update_project_average_rating({id, average_rating}))
                        })
                        Promise.all(promiseArr).then( values => {
                        console.log('finished in 1')
                            chooseDailyFeatured(db)
                        })
                    })
                })
            }
            else {
                db.get_avg_prj_with_avg().then(prjIdAvg => {
                    let promiseArr = []
                    prjIdAvg.forEach(prj => {
                        let {average_rating, id} = prj;
                        promiseArr.push(db.update_project_average_rating({id, average_rating}))
                    })
                    Promise.all(promiseArr).then( values => {
                        console.log('finished in 1')
                        chooseDailyFeatured(db)
                    })
                })
            }

        })

        function chooseDailyFeatured(db) {
            //TODO: There is a bug if there is not a project that passes criteria it won't create a new daily featured project
            let oneWeek = new Date(new Date().getTime() - (60*60*24*7*1000))
            let oneWeekDay = oneWeek.getDate()
            let oneWeekYear = oneWeek.getFullYear()
            let oneWeekMonth = oneWeek.getMonth() + 1;
            let oneWeekString = `${oneWeekYear}-${oneWeekMonth}-${oneWeekDay}`
            //This will get a project that has not been featured or has been featured over a week ago
            db.get_daily_project_random({oneWeekString}).then(featuredProject => {
                let {id} = featuredProject[0]
                let todaysDate = new Date()
                let Day = todaysDate.getDate()
                let Year = todaysDate.getFullYear()
                let Month = todaysDate.getMonth() + 1;
                let dateString = `${Year}-${Month}-${Day}`
        
                db.create_daily_featured_project({id, dateString}).then(res => {
                    db.set_project_last_featured_date({id, dateString})
                })
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
    
        db.get_project_links().then( links => {
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
        
    }

}