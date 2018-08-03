const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Massive = require('massive');
const bcrypt = require('bcrypt')
const connectionString = process.env.CONNECTION_STRING;
const session = require('express-session')
const sc = require('./Controllers/studentController');
const cc = require('./Controllers/cohortController');
const ctc = require('./Controllers/cohortTypesController');
const lc = require('./Controllers/loginController');
const pc = require('./Controllers/projectsController');
const rc = require('./Controllers/ratingsController')
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
app.post('/api/createUser', lc.createUser)

//rating routes 
app.post('/api/ratings/:projectId/:staffId', rc.addRating)
app.put('/api/ratings/:ratingId', rc.updateRating)
app.delete('/api/ratings/:ratingId', rc.deleteRating)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})