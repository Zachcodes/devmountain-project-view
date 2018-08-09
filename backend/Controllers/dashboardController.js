const {splitPersonalAndGroup} = require('../Utilities/jsUtilities');

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
            let splitRatedProjects = splitPersonalAndGroup(ratedProjects)
            let personalRated = splitRatedProjects.personalProjects
            let groupRated = splitRatedProjects.groupArr

            db.get_unrated_projects({userId}).then(unratedProjects => {
                let splitUnratedProjects = splitPersonalAndGroup(unratedProjects)
                let personalUnrated = splitUnratedProjects.personalProjects
                let groupUnrated = splitUnratedProjects.groupArr
                db.get_all_users().then( users => {
                    let returnData = {
                        rated: {
                            personal: personalRated,
                            group: groupRated
                        },
                        unrated: {
                            personal: personalUnrated,
                            group: groupUnrated
                        },
                        users
                    }
                    res.status(200).send(returnData)
                })
            })
        })

    },
    loadStaffDashboard: (req, res) => {
        const db = req.app.get('db')
        let {userId} = req.session
        db.get_staff_ratings({userId}).then(ratedProjects => {
            let splitRatedProjects = splitPersonalAndGroup(ratedProjects)
            let personalRated = splitRatedProjects.personalProjects
            let groupRated = splitRatedProjects.groupArr

            db.get_unrated_projects({userId}).then(unratedProjects => {
                let splitUnratedProjects = splitPersonalAndGroup(unratedProjects)
                let personalUnrated = splitUnratedProjects.personalProjects
                let groupUnrated = splitUnratedProjects.groupArr

                let returnGroups = {
                    rated: {
                        personal: personalRated,
                        group: groupRated
                    },
                    unrated: {
                        personal: personalUnrated,
                        group: groupUnrated
                    }
                }
                res.status(200).send(returnGroups)
            })
        })
    },
    loadStudentDashboard: (req, res) => {
        const db = req.app.get('db')
        res.status(200).send('Student Dashboard')
    }
}