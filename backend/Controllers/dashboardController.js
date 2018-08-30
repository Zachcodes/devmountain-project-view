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
        db.ratings.get_staff_ratings({userId}).then(ratedProjects => {
            let splitRatedProjects = splitPersonalAndGroup(ratedProjects)
            let personalRated = splitRatedProjects.personalProjects
            let groupRated = splitRatedProjects.groupArr

            db.projects.get_unrated_projects({userId}).then(unratedProjects => {
                let splitUnratedProjects = splitPersonalAndGroup(unratedProjects)
                let personalUnrated = splitUnratedProjects.personalProjects
                let groupUnrated = splitUnratedProjects.groupArr
                db.users.get_all_users().then( users => {
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
        db.ratings.get_staff_ratings({userId}).then(ratedProjects => {
            let splitRatedProjects = splitPersonalAndGroup(ratedProjects)
            let personalRated = splitRatedProjects.personalProjects
            let groupRated = splitRatedProjects.groupArr

            db.projects.get_unrated_projects({userId}).then(unratedProjects => {
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
        //get all projects linked to this student
        let {userId} = req.session;
        console.log(req.session)
        db.students.get_student_by_user_id({userId}).then( studentArr => {
            if(studentArr.length) {
                let student = studentArr[0]
                let {id, cohort} = student
                
                //go get all the projects associated with student 
                db.students.get_projects_by_student_id({id}).then( projects => {
                    let hasGroup, hasPersonal;
                    let promiseArr = [];
                    //if has a group, get all the group members
                    let group = projects.filter( project => project.project_type === 2)
                    let personal = projects.filter( project => project.project_type === 1)
                    if(group.length) {
                        hasGroup = true;
                        let {project_id} = group[0]
                        promiseArr.push(db.projects.get_group_members({project_id}))
                    }
                    if(personal.length) hasPersonal = true;
                    Promise.all(promiseArr).then( values => {
                        if(values.length) {
                            let groupMembers = values[0];
                            if(groupMembers.length) group[0].members = groupMembers
                        }
                        db.cohorts.get_students_by_cohort({cohort}).then(students => {
                            db.tags.get_all_tags().then(tags => {
                                let returnObj = {
                                    hasGroup,
                                    hasPersonal,
                                    group,
                                    personal,
                                    student,
                                    cohortStudents: students,
                                    tags
                                }
                                res.status(200).send(returnObj)
                            })
                        })
                    })
                    
                })
            }
        })
    }
}