require('dotenv').config({ path: __dirname + '/../.env'})
const Massive = require('massive');
const _ = require('lodash')


Massive(process.env.CONNECTION_STRING).then(db => {
    //This gets the average ratings for every project that doesn't have an average record in the db already
    chooseDailyFeatured(db)
    // db.get_avg_prj_no_avg().then(prjIdAvg => {
    //     if(prjIdAvg.length) {
    //         db.average_project_ratings.insert(prjIdAvg).then( response => {
    //             db.get_avg_prj_with_avg().then(prjIdAvg => {
    //                 let promiseArr = []
    //                 prjIdAvg.forEach(prj => {
    //                     let {average_rating, id} = prjIdAvg;
    //                     promiseArr.push(db.update_project_average_rating({id, average_rating}))
    //                 })
    //                 Promise.all(promiseArr).then( values => {
    //                     chooseDailyFeatured(db)
    //                 })
    //             })
    //         })
    //     }
    //     else {
    //         db.get_avg_prj_with_avg().then(prjIdAvg => {
    //             let promiseArr = []
    //             prjIdAvg.forEach(prj => {
    //                 let {average_rating, id} = prj;
    //                 promiseArr.push(db.update_project_average_rating({id, average_rating}))
    //             })
    //             Promise.all(promiseArr).then( values => {
    //                 chooseDailyFeatured(db)
    //             })
    //         })
    //     }

    // })
})


function chooseDailyFeatured(db) {
    let oneWeek = new Date(new Date().getTime() - (60*60*24*7*1000))
    let oneWeekDay = oneWeek.getDate()
    let oneWeekYear = oneWeek.getFullYear()
    let oneWeekMonth = oneWeek.getMonth() + 1;
    let oneWeekString = `${oneWeekYear}-${oneWeekMonth}-${oneWeekDay}`
    //This will get a project that has not been featured or has been featured over a week ago
    db.get_daily_project_random({oneWeekString}).then(featuredProject => {
        let {id} = featuredProject[0]
        db.create_daily_featured_project({id}).then(response => {
            console.log('created project', response)
        })
    })
}