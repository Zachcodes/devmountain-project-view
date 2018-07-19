import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Program from './Views/Program/Program';
import CohortOverview from './Views/CohortOverview/CohortOverview';
import CohortDetails from './Views/CohortDetails/CohortDetails';
import Student from './Views/Student/Student';
import Projects from './Views/Projects/Projects';
import ProjectDetails from './Views/ProjectDetails/ProjectDetails';


export default (
<Switch>
    <Route exact path="/" component={Program}/>
    <Route exact path="/programs/cohorts/:programtype" component={CohortOverview}/>
    <Route exact path="/programs/cohorts/:programtype/:cohortid" component={CohortDetails}/>
    <Route path="/students/:studentid" component={Student}/>
    <Route exact path="/projects" component={Projects}/>
    <Route path="/projects/:projectid" component={ProjectDetails}/>
</Switch>
)