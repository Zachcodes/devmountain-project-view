const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Massive = require('massive');
const connectionString = process.env.CONNECTION_STRING;
const sc = require('./Controllers/studentController');
const cc = require('./Controllers/cohortController');
const ctc = require('./Controllers/cohortTypesController');
const lc = require('./Controllers/loginController');
const pc = require('./Controllers/projectsController');
require('dotenv').config();

const app = express()

app.use(bodyParser.json())

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

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})