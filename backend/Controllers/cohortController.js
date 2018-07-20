module.exports = {
    getProjectsByCohort: (req, res) => {
        let db = req.app.get('db')
        let {id} = req.params
        db.get_projects_by_cohort_personal({id}).then( personalProjects => {
            db.get_projects_by_cohort_group({id}).then( groupProjects => {
                let splitGroups = {}
                for(let i = 0; i < groupProjects.length; i++) {
                    if(!splitGroups[groupProjects[i].project_id]) {
                        splitGroups[groupProjects[i].project_id] = {
                            members: [],
                            projectInfo: []
                        }
                    } 
                    if(!splitGroups[groupProjects[i].project_id].projectInfo.length) {
                       let project = {
                           projectName: groupProjects[i].project_name,
                           url: groupProjects[i].url
                       }
                       splitGroups[groupProjects[i].project_id].projectInfo.push(project)
                    }
                    let person = {
                        first: groupProjects[i].first,
                        last: groupProjects[i].last,
                        id: groupProjects[i].id
                    }
                    splitGroups[groupProjects[i].project_id].members.push(person)
                }
                let tempObj = {
                    personalProjects,
                    splitGroups
                }

                res.status(200).send(tempObj)

            })
        }).catch(err => res.status(500).send(err))
    }
}