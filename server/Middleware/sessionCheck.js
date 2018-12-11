module.exports = (req, res, next) => {
    // TODO: Come back and remove this
    req.session.loggedIn = true
    if(req.session.loggedIn) return next()
    res.status(403).send('Login')
}