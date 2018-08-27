const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Massive = require('massive');
const bcrypt = require('bcrypt')
const connectionString = process.env.CONNECTION_STRING;
const session = require('express-session')
const CronJob = require('cron').CronJob
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
    averageRatingCron.start()
    checkLinkCron.start()
    cleanUpLogCron.start()
})

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

//routes 

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