module.exports = {
    loadDashboard: (req, res) => {
        const db = req.app.get('db')
        let response = {
            role: ''
        }
        if(req.session.isAdmin) response.role = 'admin'
        if(req.session.isStaff) response.role = 'staff'
        if(req.session.isStudent) response.role = 'student'
        res.status(200).send(response)
    },
    loadAdminDashboard: (req, res) => {
        const db = req.app.get('db')
        let {userId} = req.session
        db.get_staff_ratings({userId}).then(ratedProjects => {
            let response = {
                userRatedProjects: ratedProjects,
                unratedProjects: []
            }
            db.get_unrated_projects({userId}).then(unratedProjects => {
                response.unratedProjects = unratedProjects;
                res.status(200).send(response)
            })
        })

    },
    loadStaffDashboard: (req, res) => {
        const db = req.app.get('db')
        let {userId} = req.session
        db.get_staff_ratings({userId}).then(dbRes => {
            res.status(200).send(response)
        })
    },
    loadStudentDashboard: (req, res) => {
        const db = req.app.get('db')
        res.status(200).send('Student Dashboard')
    }
}