module.exports = {
    login: (req, res) => {
        const bcrypt = req.app.get('bcrypt')
        const saltRounds = req.app.get('saltRounds');
        const db = req.app.get('db')
        const {username, password} = req.body;
        //get username 
        db.get_username({username}).then(response => {
            if(response.length) {
                let user = response[0]
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result) {
                        req.session.loggedIn = true
                        res.status(200).send('Logged in')
                    }
                    else {
                        res.status(403).send('Username password do not match')
                    }
                })
            }
            else {
                res.status(200).send('Could not find a matching username')
            }
        })
    },
    createUser: (req, res) => {
        const bcrypt = req.app.get('bcrypt')
        const saltRounds = req.app.get('saltRounds');
        const db = req.app.get('db')
        const {username, password} = req.body

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