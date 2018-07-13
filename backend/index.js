const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Massive = require('massive');
const connectionString = process.env.CONNECTION_STRING;
const sc = require('./Controllers/studentController');
const cc = require('./Controllers/cohortController');
const ctc = require('./Controllers/cohortTypesController');
const pc = require('./Controllers/projectsController');
require('dotenv').config();

const app = express()

//massive setup 
Massive(process.env.CONNECTION_STRING).then(dbInstance => app.set('db', dbInstance))
// const massiveInstance = Massive.connectSync({connectionString})

// app.set('db', massiveInstance)

//routes 

//** Cohort Program Routes routes **
app.get('/api/programs', ctc.getAllPrograms)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})