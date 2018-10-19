module.exports = {
    getAllPrograms: (req, res) => {
        const db = req.app.get('db')
        db.programs.get_program_types().then( types => {
            db.projects.get_daily_featured_project().then(project => {
                let {id} = project[0]
                db.students.get_students_for_daily({id}).then( students => {
                    project[0].students = students;
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