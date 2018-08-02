require('dotenv').config({ path: __dirname + '/../.env'})
const Massive = require('massive');
const axios = require('axios')
const fs = require('fs')
const errorFile = '../logging/deadLinks.txt'

Massive(process.env.CONNECTION_STRING).then(db => {
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
            if(brokenIds.length) {
                db.projects.update({id: changedProjectsBrokenIds}, {active: false})
                .catch(err => writeErrorToFile('\n Could not update broken'))
            }
            if(activeIds.length) {
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
})
