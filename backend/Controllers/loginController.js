module.exports = {
    login: (req, res) => {
        const bcrypt = require('bcrypt')
        const saltRounds = 10;

        let {username, password} = req.body;
    },
    createUser: (req, res) => {
        const bcrypt = require('bcrypt')
        let {username, password} = req.body
        let db = req.app.get('db')
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hash) {
                db.create_user({username, hash}).then( response => {
                    res.status(200).send('Created user')
                }).catch(err => {
                    res.status(500).send(err)
                })
            })
        })
    }
}