const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Massive = require('massive');
const bcrypt = require('bcrypt')
const connectionString = process.env.CONNECTION_STRING;
const session = require('express-session')
//require controllers
const sc = require('./Controllers/studentController');
const cc = require('./Controllers/cohortController');
const ctc = require('./Controllers/cohortTypesController');
const lc = require('./Controllers/loginController');
const pc = require('./Controllers/projectsController');
const rc = require('./Controllers/ratingsController')
const uc = require('./Controllers/userController')
//require middleware 
const adminCheck = require('./Middleware/adminCheck')
const staffCheck = require('./Middleware/staffCheck')

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
Massive(process.env.CONNECTION_STRING).then(dbInstance => app.set('db', dbInstance))


//routes 

//** Cohort Program Routes routes **
app.get('/api/programs', ctc.getAllPrograms)
app.get('/api/programs/:programtype', ctc.getProgramByType)

//cohort project routes 
app.get('/api/cohorts/:id/projects', cc.getProjectsByCohort)

//students routes 
app.get('/api/students/:id', sc.getStudent)

//login routes 
app.post('/api/login', lc.login)
app.delete('/api/logout', lc.logout)

//rating routes 
app.post('/api/ratings/:projectId/:staffId', staffCheck, rc.addRating)
app.put('/api/ratings/:ratingId', staffCheck, rc.updateRating)
app.delete('/api/ratings/:ratingId', staffCheck, rc.deleteRating)

//add user routes 
//TODO: need to make it so that there are admin add user routes and user add user
app.post('/api/users/add/admin', adminCheck, uc.addUserAdmin)
app.post('/api/users/add/student', uc.addUserStudent)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})