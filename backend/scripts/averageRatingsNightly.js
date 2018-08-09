require('dotenv').config({ path: __dirname + '/../.env'})
const Massive = require('massive');
const _ = require('lodash')


Massive(process.env.CONNECTION_STRING).then(db => {

    //This will get all projects with no average rating so we can create and also filters out those that have no rating at all
    db.get_projects_with_no_average().then(projectIdArray => {
        let projectIds = projectIdArray.map( project => project.id)
        db.project_ratings.find({project_id: projectIds}).then( projectsWithNoAvgRating => {
            let grouped = _.groupBy(projectsWithNoAvgRating, 'project_id')
            console.log(grouped)
        }).catch(err => console.log(22222))
    })
})

