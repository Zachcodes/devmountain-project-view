module.exports = {
    loadDashboard: (req, res) => {
        let response = {
            role: ''
        }
        if(req.session.isAdmin) response.role = 'admin'
        if(req.session.isStaff) response.role = 'staff'
        if(req.session.isStudent) response.role = 'student'
        res.status(200).send(response)
    }
}