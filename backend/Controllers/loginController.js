module.exports = {
    login: (req, res) => {
        const bcrypt = req.app.get('bcrypt')
        const saltRounds = req.app.get('saltRounds');
        const db = req.app.get('db')
        let {username, password} = req.body;

        username = username.toLowerCase()
        
        db.login.get_username({username}).then(response => {
            if(response.length) {
                let user = response[0]
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result) {
                        req.session.loggedIn = true
                        if(user.role_id === 1) req.session.isAdmin = true
                        if(user.role_id === 2) req.session.isStaff = true
                        if(user.role_id === 3) req.session.isStudent = true
                        req.session.userId = user.user_id

                        res.status(200).send({redirectUrl: '/'})
                    }
                    else {
                        res.status(400).send('Username password do not match')
                    }
                })
            }
            else {
                res.status(400).send('Could not find a matching username')
            }
        })
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({loggedIn: false})
    },
    loginCheck: (req, res) => {
        if(req.session.loggedIn) return res.status(200).send({loggedIn: true})
        res.status(200).send({loggedIn: false})
    },
    resetPassword: (req, res) => {
        let {userId} = req.params; 
        let {newPassword} = req.body;
        const bcrypt = req.app.get('bcrypt')
        const saltRounds = req.app.get('saltRounds');
        const db = req.app.get('db') 
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(newPassword, salt, function(err, hash) {
                db.login.reset_password({userId, hash}).then(response => {
                    res.sendStatus(200)
                }).catch(err => res.status(500).send('Could not reset password'))
            })
        })
    }
}