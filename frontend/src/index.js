import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import store from './Redux/store'

// import registerServiceWorker from './registerServiceWorker'

//Routing
import { HashRouter, Switch, Route } from 'react-router-dom';

import NavBar from './Components/NavBar'
import Landing from './Views/Landing/Landing';
import ProgramLanding from './Views/ProgramLanding/ProgramLanding';
import ProgramCohorts from './Views/ProgramCohorts/ProgramCohorts';
import CohortDetails from './Views/CohortDetails/CohortDetails';
import Student from './Views/Student/Student';
import Projects from './Views/Projects/Projects';
import ProjectDetails from './Views/ProjectDetails/ProjectDetails';
import Login from './Views/Login/Login';
import LoggedIn from './Views/LoggedIn/LoggedIn';

ReactDOM.render(
<Provider store={store}>
    <HashRouter>
    <Switch>
        <Route path="/" render={(props) => {
            return (
                <App {...props}>
                    <NavBar {...props}/>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/programs" component={ProgramLanding} />
                        <Route exact path="/programs/cohorts/:programtype" component={ProgramCohorts}/>
                        <Route exact path="/programs/cohorts/:programtype/:cohortid" component={CohortDetails}/>
                        <Route path="/students/:studentid" component={Student}/>
                        <Route exact path="/projects" component={Projects}/>
                        <Route path="/projects/:projectid" component={ProjectDetails}/>
                        <Route path="/login" component={Login} />
                        <Route path="/dashboard" component={LoggedIn} />
                    </Switch>
                </App>
            )
        }}/>
    </Switch>
    </HashRouter>
</Provider>, document.getElementById('root')
);
// registerServiceWorker();
