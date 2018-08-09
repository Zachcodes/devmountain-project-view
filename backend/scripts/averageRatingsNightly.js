require('dotenv').config({ path: __dirname + '/../.env'})
const Massive = require('massive');
const _ = require('lodash')


Massive(process.env.CONNECTION_STRING).then(db => {

    //This gets the average ratings for every project that doesn't have an average record in the db already
    db.get_avg_prj_no_avg().then(prjIdAvg => {
        if(prjIdAvg.length) {
            db.average_project_ratings.insert(prjIdAvg).then( response => {
                db.get_avg_prj_with_avg().then(prjIdAvg => {
                    prjIdAvg.forEach(prj => {
                        let {average_rating, id} = prjIdAvg;
                        db.update_project_average_rating({id, average_rating})
                    })
                })
            })
        }
        else {
            db.get_avg_prj_with_avg().then(prjIdAvg => {
                prjIdAvg.forEach(prj => {
                    let {average_rating, id} = prj;
                    db.update_project_average_rating({id, average_rating})
                })
            })
        }

    })
})
