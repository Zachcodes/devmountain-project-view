module.exports = {
    getProjectsByCohort: (req, res) => {
        console.log('hello')
        let db = req.app.get('db')
        let {id} = req.params
        db.get_projects_by_cohort({id}).then( projects => {
            res.status(200).send(projects)
        }).catch(err => res.status(500).send(err))
    }
}