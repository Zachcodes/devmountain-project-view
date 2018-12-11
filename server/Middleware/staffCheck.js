module.exports = (req, res, next) => {
    if(req.session.isStaff || req.session.isAdmin) return next()
    res.status(500).send('Not allowed')
}