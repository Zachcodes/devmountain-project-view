module.exports = {
    filterProjects: (req, res) => {
        let db = req.app.get('db')
        let {cohortId} = req.params;
        let {projectType, filter} = req.query;
        if(filter) {
            let filtered = filter.split("")
            filtered.push('%')
            filtered.unshift('%')
            filter = filtered.join("")
        }

        if(projectType) {
            if(filter) {
                db.get_projects_by_filter_and_type({filter, projectType, cohortId}).then(projects => {
                    res.status(200).send(projects)
                })
            }
            else {
                db.get_projects_by_type({projectType, cohortId}).then(projects => {
                    res.status(200).send(projects)
                })
            }
        }
        else {
            db.get_projects_by_filter({filter, cohortId}).then(projects => {
                res.status(200).send(projects)                
            })
        }
    }
}