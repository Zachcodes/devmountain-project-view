module.exports = (req, res, next) => {
    let {username, password} = req.body
    if(!username || !password) return res.status(500).send('Invalid username or password')
    next()
}