const {splitPersonalAndGroup} = require('../Utilities/jsUtilities');

module.exports = {
    filterProjects: (req, res) => {
        let db = req.app.get('db')
        let {cohortId} = req.params;
        let {projectType, filter} = req.query;
        if(filter) {
            filter = filter.toLowerCase()
            let filtered = filter.split("")
            filtered.push('%')
            filtered.unshift('%')
            filter = filtered.join("")
        }
        cohortId = parseInt(cohortId);
        if(projectType) {
            projectType = parseInt(projectType);
            if(filter) {
                db.get_projects_by_filter_and_type({filter, projectType, cohortId}).then(projects => {
                    let splitProjects = splitPersonalAndGroup(projects)
                    let personalProjects = splitProjects.personalProjects
                    let groupProjects = splitProjects.groupArr
                    let returnObj = {
                        personalProjects,
                        groupProjects
                    }
                    res.status(200).send(returnObj)
                })
            }
            else {
                db.get_projects_by_type({projectType, cohortId}).then(projects => {
                    let splitProjects = splitPersonalAndGroup(projects)
                    let personalProjects = splitProjects.personalProjects
                    let groupProjects = splitProjects.groupArr
                    let returnObj = {
                        personalProjects,
                        groupProjects
                    }
                    res.status(200).send(returnObj)
                })
            }
        }
        else {
            db.get_projects_by_filter({filter, cohortId}).then(projects => {
                let splitProjects = splitPersonalAndGroup(projects)
                let personalProjects = splitProjects.personalProjects
                let groupProjects = splitProjects.groupArr
                let returnObj = {
                    personalProjects,
                    groupProjects
                }
                res.status(200).send(returnObj)               
            })
        }
    }
}