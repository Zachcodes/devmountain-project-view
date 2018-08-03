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
                        if(user.role_id === 1) req.session.isAdmin = true
                        if(user.role_id === 2) req.session.isStaff = true
                        if(user.role_id === 3) req.session.isStudent = true

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
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send('Logged out')
    }
}