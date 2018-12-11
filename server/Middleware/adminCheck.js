module.exports = (req, res, next) => {
    if(req.session.isAdmin) return next()
    res.status(403).send('Not allowed')
}