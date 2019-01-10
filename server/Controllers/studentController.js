const {addImagesToProject} = require('../Utilities/jsUtilities')
module.exports = {
    getStudentAndProjects: (req, res) => {
        let db = req.app.get('db');
        let {id} = req.params;
        let promises = []
        let studentPromise = db.students.get_student_by_id({id}).catch(err => console.log('could not retrieve students'))
        let projectsPromise = db.projects.get_projects_by_student_id({studentId: id}).catch(err => console.log('could not retrieve projects'))
        promises.push(studentPromise, projectsPromise)
        Promise.all(promises).then(values => {
            let groupPromises = []
            let student = values[0][0]
            let projects = values[1]
            let projectsObj = {}
            projects.forEach( p => {
                if(!projectsObj[Number(p.project_id)]) groupPromises.push(db.projects.get_group_members({project_id: p.project_id}).catch(err => console.log('could not retrieve group members')))
                addImagesToProject(p, projectsObj)
            })
            Promise.all(groupPromises).then(values => {
                let condensedProjects = []
                for(let key in projectsObj) {
                    projectsObj[key].groupMembers = values.filter( studentArr => studentArr[0].pl_project_id === Number(key))[0]
                    condensedProjects.push(projectsObj[key])
                }
                
                let returnObj = {
                    student,
                    projects: condensedProjects
                }
                res.status(200).send(returnObj)
            })
        })
    },
    updatePicture: (req, res) => {
        let db = req.app.get('db');
        let {id} = req.session.passport.user;
        let {pictureUrl} = req.body;
        let newUrl = `${process.env.AWS_PICTURE_UPLOAD_BASE}${pictureUrl}`
        db.students.update_student_picture({id, newUrl}).then( studentDetails => {
            res.status(200).send(studentDetails[0])
        })
    },
    updateAbout: (req, res) => {
        let db = req.app.get('db');
        let {id} = req.session.passport.user;
        let {about} = req.body;
        db.students.update_student_about({id, about}).then( studentDetails => {
            res.status(200).send(studentDetails[0])
        })
    },
    updateInfo(req, res) {
        let db = req.app.get('db')
        let {id} = req.session.passport.user;
        let {about, first, last, email, linkedin, portfolio, github, image} = req.body 
        db.students.update_student_info({id, about, first, last, email, linkedin, portfolio, github, image}).then(updatedStudent => {
            res.status(200).send(updatedStudent[0])
        }).catch( err => res.status(500).send('Could not update student details'))
    },
    async getStudentInfo(req, res) {
        let db = req.app.get('db')
        let {id} = req.session.passport.user;
        let studentArr = await db.students.get_student_by_user_id({userId: id})
        let student = studentArr[0]
        let cohorts = await db.cohorts.get_cohorts_for_new_user()
        let cohortTypes = Object.keys(cohorts.reduce((a, c) => {
            a[c.type] ? a[c.type].push(c.type) : a[c.type] = []
            return a;
        }, {}))

        let returnObj = {
            student,
            cohorts,
            cohortTypes
        }
        res.status(200).send(returnObj)
        
    }
}