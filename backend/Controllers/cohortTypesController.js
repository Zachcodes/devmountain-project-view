module.exports = {
    getAllPrograms: (req, res, next) => {
        const db = req.app.get('db')
        db.getCohortTypes().then( types => {
            res.status(200).send(types)
        }).catch(err => {
            res.status(500).send(err)
        })
    }
}