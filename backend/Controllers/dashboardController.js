module.exports = {
    loadDashboard: (req, res) => {
        let response = {
            role: ''
        }
        if(req.session.isAdmin) response.role = 'admin'
        if(req.session.isStaff) response.role = 'staff'
        if(req.session.isStudent) response.role = 'student'
        res.status(200).send(response)
    },
    loadAdminDashboard: (req, res) => {
        //TODO: grab all projects and their ratings for this admin
        let {adminId} = req.params 
        db.get_staff_ratings({adminId}).then(response => {
            res.status(200).send(response)
        })

    },
    loadStaffDashboard: (req, res) => {

    },
    loadStudentDashboard: (req, res) => {

    }
}