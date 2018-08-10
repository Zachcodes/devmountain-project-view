import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Landing from './Views/Landing/Landing';
import ProgramLanding from './Views/ProgramLanding/ProgramLanding';
import CohortOverview from './Views/CohortOverview/CohortOverview';
import CohortDetails from './Views/CohortDetails/CohortDetails';
import Student from './Views/Student/Student';
import Projects from './Views/Projects/Projects';
import ProjectDetails from './Views/ProjectDetails/ProjectDetails';
import Login from './Views/Login/Login';
import LoggedIn from './Views/LoggedIn/LoggedIn';


export default (
<Switch>
    <Route exact path="/" component={Landing}/>
    <Route exact path="/programs" component={ProgramLanding} />
    <Route exact path="/programs/cohorts/:programtype" component={CohortOverview}/>
    <Route exact path="/programs/cohorts/:programtype/:cohortid" component={CohortDetails}/>
    <Route path="/students/:studentid" component={Student}/>
    <Route exact path="/projects" component={Projects}/>
    <Route path="/projects/:projectid" component={ProjectDetails}/>
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={LoggedIn} />
</Switch>
)