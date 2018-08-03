module.exports = (req, res, next) => {
    let {email} = req.body
    if(!email) res.status(500).send('Need to pass an email in the body')
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())) return next()
    res.status(500).send('Did not pass email check')
}