require('dotenv').config({ path: __dirname + '/../.env'})
const Massive = require('massive');
const axios = require('axios')

Massive(process.env.CONNECTION_STRING).then(db => {
    let completed = {}
    let changedProjectsActiveIds = []
    let changedProjectsBrokenIds = []

    function checkFinished() {
        let finished = true;
        for(let key in completed) {
            if(!completed[key]) finished = false
        }
        if(finished) {
            if(brokenIds.length) {
                db.projects.update({id: changedProjectsBrokenIds}, {active: false})
                .catch(err => console.log('err'))
            }
            if(activeIds.length) {
              db.projects.update({id: changedProjectsActiveIds}, {active: true}) 
              .catch(err => console.log('err'))
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
                            links[i].active = true;
                            changedProjectsActiveIds.push(links[i].id)
                        }
                    }
                    checkFinished()
                })
                .catch( err => {
                    if(links[i].active) {
                        links[i].active = false 
                        changedProjectsBrokenIds.push(links[i].id)
                    }  
                    checkFinished()
                })
            } 
            else {
                completed[i] = true;
                if(links[i].active) {
                    links[i].active = false
                    changedProjectsBrokenIds.push(links[i].id)
                } 
                checkFinished()
            }
        }
    })
    .catch(err => console.log('Error on db', err))
})
