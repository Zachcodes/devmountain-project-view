module.exports = {
    getAllPrograms: (req, res, next) => {
        const db = req.app.get('db')
        db.get_program_types().then( types => {
            db.get_daily_featured_project().then(project => {
                let {id} = project[0]
                db.get_students_for_daily({id}).then( students => {
                    project.students = students;
                    let returnObj = {
                        dailyProject: project,
                        types: types
                    }
                    res.status(200).send(returnObj)
                })
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    },
    getProgramByType: (req, res, next) => {
        const db = req.app.get('db')

        let { programtype } = req.params;
        programtype = Number(programtype)
 
        db.get_cohorts_by_type({programtype}).then( cohorts => {
            res.status(200).send(cohorts)
        })
    }
}