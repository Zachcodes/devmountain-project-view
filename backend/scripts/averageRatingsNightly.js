require('dotenv').config({ path: __dirname + '/../.env'})
const Massive = require('massive');
const _ = require('lodash')


Massive(process.env.CONNECTION_STRING).then(db => {

    //This will get all projects with no average rating so we can create and also filters out those that have no rating at all
    db.get_projects_with_no_average().then(projectIdArray => {
        console.log(projectIdArray)
    })
})

