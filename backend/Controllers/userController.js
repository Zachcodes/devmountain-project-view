module.exports = {
    addUserAdmin: (req, res) => {
        const db = req.app.get('db')
        let {name, roleId} = req.body
        db.add_user({name, roleId}).then(response => {
            res.status(200).send('Added user admin')
        }).catch(err => res.status(500).send('Could not add user'))
    },
    addUserStudent: (req, res) => {
        const db = req.app.get('db')
        let {name, roleId} = req.body
        db.add_user({name, roleId}).then(response => {
            res.status(200).send('Added user student')
        }).catch(err => res.status(500).send('Could not add user'))
    }
}