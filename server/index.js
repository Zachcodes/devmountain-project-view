const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Massive = require('massive');
const bcrypt = require('bcrypt')
const connectionString = process.env.CONNECTION_STRING;
const session = require('express-session')
const CronJob = require('cron').CronJob
const passport = require('passport')
const Devmtn = require('devmtn-auth')
const DevmtnStrategy = Devmtn.Strategy;
const devmtnAuthConfig = require('./AuthConfig')
//require controllers
const sc = require('./Controllers/studentController');
const cc = require('./Controllers/cohortController');
const ctc = require('./Controllers/cohortTypesController');
const lc = require('./Controllers/loginController');
const pc = require('./Controllers/projectsController');
const rc = require('./Controllers/ratingsController')
const uc = require('./Controllers/userController')
const dc = require('./Controllers/dashboardController')
const fc = require('./Controllers/filterController')
//require middleware 
const adminCheck = require('./Middleware/adminCheck')
const staffCheck = require('./Middleware/staffCheck')
const validEmailCheck = require('./Middleware/validEmailCheck')
const sessionCheck = require('./Middleware/sessionCheck')
const validLogin = require('./Middleware/validLogin')
const setSessionOffPassport = require('./Middleware/setSessionOffPassport')
//cron
const cronJobs = require('./Cron/Cron')

require('dotenv').config();
const saltRounds = 10;

const app = express()

app.set('saltRounds', saltRounds)
app.set('bcrypt', bcrypt)

app.use(bodyParser.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}))

//massive setup 
Massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    // TODO: Bring these back in later
    // averageRatingCron.start()
    // checkLinkCron.start()
    // cleanUpLogCron.start()
    // syncCohortsCron.start()
})

app.use(passport.initialize())
app.use(passport.session())

//passport
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use('devmtn', new DevmtnStrategy(devmtnAuthConfig, function(jwtoken, user, done) {
    let {id: devmtn_id, first_name, last_name, email, cohortId} = user;
    
    let db = app.get('db')
    db.auth.get_user_by_devmtn_id({devmtn_id}).then( userArr => {
        if(userArr.length) {
            done(null, userArr[0])
        }
        else {
            let isStudent = Devmtn.checkRoles(user, 'student')
            let isAlumni = Devmtn.checkRoles(user, 'alumni')
            let isMentor = Devmtn.checkRoles(user, 'mentor')
            let isLeadMentor = Devmtn.checkRoles(user, 'lead_mentor')
            let isLeadInstructor = Devmtn.checkRoles(user, 'lead_instructor')
            let isInstructor = Devmtn.checkRoles(user, 'instructor')
            let isAdmin = Devmtn.checkRoles(user, 'admin')

            let projectBrowserRole; 

            if(isStudent || isAlumni) projectBrowserRole = 3
            if(isMentor || isLeadMentor || isLeadInstructor || isInstructor) projectBrowserRole = 2
            if(isAdmin) projectBrowserRole = 1
            projectBrowserRole = 3
            let newUser = {
                name: `${first_name} ${last_name}`,
                role_id: projectBrowserRole, 
                email,
                devmtn_id
            }

            db.auth.create_user(newUser).then( user => {
                let userId;
                if(user[0]) userId = user[0].id
                if(projectBrowserRole === 3 && userId) {
                    let defaultPictureUrl = process.env.DEFAULT_PICTURE
                    cohortId = cohortId ? cohortId : null;
                    db.auth.create_student({first_name, last_name, cohortId, userId, defaultPictureUrl}).then( student => {
                        done(null, user)
                    })
                }
                else {
                    done(null, user)
                }
            })
        }
    })


}))

app.use(setSessionOffPassport)

//Cron jobs 
const averageRatingCron = new CronJob('0 0 2 * * 0-6', () => {
    const db = app.get('db')
    if(db) cronJobs.averageRatingExecution(db)
})


const checkLinkCron = new CronJob('0 0 1 * * 0-6', () => {
    const db = app.get('db')
    if(db) cronJobs.checkLinkStatusExecution(db)
})

const cleanUpLogCron = new CronJob('0 30 12 * * 6', () => {
    cronJobs.cleanUpLogging()
})

// const syncCohortsCron = new CronJob('0 30 1 * * 0-6', () => {
const syncCohortsCron = new CronJob('30 * * * * * *', () => {
    const db = app.get('db')
    cronJobs.grabCohortsFromDevMountain(db)
})

//routes 

//devmountain auth
app.get('/api/auth', passport.authenticate('devmtn'))

app.get('/api/auth/callback', passport.authenticate('devmtn'), (req, res) => {
    console.log(111111)
    if(req.user) {
        res.redirect('http://localhost:3005/#/dashboard')
    } else {
        res.redirect('http://localhost:3005/#/')
    }
})

//S3 Stuff
// app.use('/s3', require('react-s3-uploader/s3router')({
//     bucket: process.env.BUCKET,
//     region: process.env.REGION, //optional
//     headers: {'Access-Control-Allow-Origin': '*'}, // optional
//     ACL: 'private', // this is default
//     uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
// }));
app.use('/s3', (req, res) => {
    console.log(req.body)
});

//session routes 
app.get('/api/loginCheck', lc.loginCheck)

//Project routes 
app.post('/api/projects', pc.addProject)

//Cohort Program Routes routes
app.get('/api/programs', ctc.getAllPrograms)
app.get('/api/programs/:programtype', ctc.getProgramByType)

//cohort project routes 
app.get('/api/cohorts/:id/projects', cc.getProjectsByCohort)

//students routes 
app.get('/api/students/:id', sc.getStudent)
app.put('/api/students/updatePicture', sc.updatePicture)
app.put('/api/students/updateAbout', sc.updateAbout)

//login routes 
app.post('/api/login', validLogin, lc.login)
app.delete('/api/logout', lc.logout)
app.post('/api/login/reset/:userId', adminCheck, lc.resetPassword)

//rating routes 
app.post('/api/ratings/:projectId', staffCheck, rc.addRating)
app.put('/api/ratings/:ratingId', staffCheck, rc.updateRating)
app.delete('/api/ratings/:ratingId', staffCheck, rc.deleteRating)

//add user routes 
app.post('/api/users/add/admin', validEmailCheck, adminCheck, uc.addUserAdmin)
app.post('/api/users/add/student', validEmailCheck, uc.addUserStudent)

//dashboard routes 
app.get('/api/loadDashboard', sessionCheck, dc.loadDashboard)
app.get('/api/loadDashboard/admin', sessionCheck, adminCheck, dc.loadAdminDashboard)
app.get('/api/loadDashboard/staff', sessionCheck, staffCheck, dc.loadStaffDashboard)
app.get('/api/loadDashboard/student', sessionCheck, dc.loadStudentDashboard)

//filter routes 
app.get('/api/filter/:cohortId', fc.filterProjects)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})