module.exports = (req, res, next) => {
    if(req.session.passport) {
        if(req.session.passport.user && !req.session.loggedIn) {
            let {user} = req.session.passport
            req.session.loggedIn = true;
            if(user[0].role_id === 1) req.session.isAdmin = true
            if(user[0].role_id === 2) req.session.isStaff = true
            if(user[0].role_id === 3) req.session.isStudent = true
            req.session.userId = user[0].id
        }
    }
    next()
}