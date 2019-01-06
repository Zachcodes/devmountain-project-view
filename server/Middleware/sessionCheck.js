module.exports = (req, res, next) => {
    if(req.session.loggedIn) return next()
    res.status(403).send('Login')
}