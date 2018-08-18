const {splitPersonalAndGroup} = require('../Utilities/jsUtilities');

module.exports = {
    getProjectsByCohort: (req, res) => {
        let db = req.app.get('db')
        let {id} = req.params
        db.get_projects_by_cohort({id}).then( projects => {
                db.get_students_by_cohort({id}).then( students => {

                    let splitProjects = splitPersonalAndGroup(projects)
                    let personalProjects = splitProjects.personalProjects
                    let groupProjects = splitProjects.groupArr
                    let returnObj = {
                        personalProjects,
                        groupProjects,
                        students
                    }
                    res.status(200).send(returnObj)

                })


        }).catch(err => res.status(500).send(err))
    }
}