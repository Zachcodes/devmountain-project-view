module.exports = {
    getAllPrograms: (req, res) => {
        const db = req.app.get('db')
        let promises = []
        promises.push(db.programs.get_program_types().catch(err => console.log('couldn\'t get programs')))
        promises.push(db.projects.get_daily_featured_project().catch(err => console.log('couldn\'t get daily featured project')))
        Promise.all(promises).then(values => {
            let types = values[0]
            let project = values[1][0]
            let project_id = project.project_id
            promises = []
            promises.push(db.projects.get_group_members({project_id}))
            promises.push(db.projects.get_project_images({project_id}))
            Promise.all(promises).then(values => {
                let groupMembers = values[0]
                let images = values[1]
                project.groupMembers = groupMembers
                project.images = images
                let returnObj = {
                    featuredProject: project,
                    types: types
                }
                res.status(200).send(returnObj)
            })
        })
    },
    getProgramByType: (req, res) => {
        const db = req.app.get('db')

        let { programtype } = req.params;
        
        programtype = Number(programtype)
        if(programtype !== 0) {
            db.cohorts.get_cohorts_by_type({programtype}).then( cohorts => {
                res.status(200).send(cohorts)
            })
        }
        else {
            db.cohorts.get_cohorts().then( cohorts => {
                res.status(200).send(cohorts)
            }).catch(err => res.status(500).send(err))
        }
    }
}