module.exports = {
    addUserAdmin: (req, res) => {
        const db = req.app.get('db')
        const bcrypt = req.app.get('bcrypt')
        const saltRounds = req.app.get('saltRounds');
        const {username, password, name, roleId, email} = req.body
        
        db.login.check_for_existing_username({username}).then(response => {
            if(!response.length) {
                db.users.add_user({name, roleId, email}).then(response => {
                    let userId = response[0].id
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(password, salt, function(err, hash) {
                            db.login.create_user_login_info({username, hash, userId}).then( response => {
                                res.status(200).send('Created user')
                            }).catch(err => {
                                res.status(500).send('Could not create user login info')
                            })
                        })
                    })
        
                }).catch(err => res.status(500).send('Could not add user'))
            }
            else {
                res.status(400).send('Username exists already')
            }
        })
    },
    addUserStudent: (req, res) => {
        const db = req.app.get('db');
        const bcrypt = req.app.get('bcrypt')
        const saltRounds = req.app.get('saltRounds');
        let {name, username, password, email} = req.body;
        let roleId = 3;
        db.login.check_for_existing_username({username}).then(response => {
            if(!response.length) {
                db.users.add_user({name, roleId, email}).then(response => {
                    let userId = response[0].id
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(password, salt, function(err, hash) {
                            db.login.create_user_login_info({username, hash, userId}).then( response => {
                                res.status(200).send('Created user')
                            }).catch(err => {
                                res.status(500).send('Could not create user login info')
                            })
                        })
                    })
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
            else {
                res.status(400).send('Username exists already')
            }
        })
    }
}
