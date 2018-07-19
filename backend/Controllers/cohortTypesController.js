module.exports = {
    getAllPrograms: (req, res, next) => {
        const db = req.app.get('db')
        db.get_program_types().then( types => {
            res.status(200).send(types)
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