const {splitPersonalAndGroup, addImagesToProject} = require('../Utilities/jsUtilities');

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
        //TODO: Remove this after testing
        userId = 34
        db.students.get_student_by_user_id({userId}).then( studentArr => {
            if(studentArr.length) {
                let student = studentArr[0]
                let {id, cohort} = student
                
                //go get all the projects associated with student 
                db.students.get_projects_by_student_id({id}).then( projects => {
                    let projectsObj = {}
                    projects.forEach( p => {
                        addImagesToProject(p, projectsObj)
                    })
                    let condensedProjects = []
                    for(let key in projectsObj) condensedProjects.push(projectsObj[key])
                    let promiseArr = [];
                    //if has a group, get all the group members
                    let group = condensedProjects.filter( project => project.project_type === 2)
                    let personal = condensedProjects.filter( project => project.project_type === 1)
                    if(group.length) {
                        let {project_id} = group[0]
                        promiseArr.push(db.projects.get_group_members({project_id}))
                    }
                    Promise.all(promiseArr).then( values => {
                        if(values.length) {
                            let groupMembers = values[0];
                            if(groupMembers.length) group[0].members = groupMembers
                        }
                        db.cohorts.get_students_by_cohort({cohort}).then(students => {
                            //TODO: Possibly bring back in tags depending on what user wants
                            // db.tags.get_all_tags().then(tags => {
                            // })
                            let returnObj = {
                                group,
                                personal,
                                student,
                                cohortStudents: students
                            }
                            res.status(200).send(returnObj)
                        })
                    })
                    
                })
            }
        })
    }
}