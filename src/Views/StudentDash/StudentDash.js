import React, {Component} from 'react'
import axios from 'axios'
import './StudentDash.css'

import StudentDashInfo from '../../Components/StudentDashInfo'
import StudentDashSettings from '../../Components/StudentDashSettings'
import NewProject from '../../Components/NewProject'
import StudentProject from '../../Components/StudentProject'

export default class Student extends Component {
    constructor() {
        super()
        this.state = {
            group: [],
            personal: [],
            studentInfo: {},
            studentSettings: {},
            cohortStudents: [],
            retrievedDashboard: false,
            displayedProjects: 'group',
            addNew: false
        }
    }

    componentDidMount() {
        axios.get('/api/loadDashboard/student').then(response => {
            let {hasGroup, hasPersonal, group, personal, student, cohortStudents, tags} = response.data
            this.setState({
                group,
                personal,
                studentInfo: student,
                cohortStudents,
                tags,
                retrievedDashboard: true
            })
        }).catch(err => console.log(err))
    }

    updateStudentInfo = (student) => {
        this.setState({
            student
        })
    }

    setDisplayed = (displayedProjects) => {
        this.setState({
            displayedProjects
        })
    }

    addNew = () => {
        let addNew = this.state.addNew 
        if(addNew) return;
        this.setState({addNew: true})
    }

    cancel = () => {
        this.setState({
            addNew: false
        })
    }

    render() {
        let { studentInfo: student, retrievedDashboard, studentSettings, displayedProjects, addNew, group, personal } = this.state
        let projectNav, projectsToDisplay;
        if(displayedProjects === 'group') {
            projectNav = <span><span onClick={() => this.setDisplayed('group')}><u>Group</u></span> | <span onClick={() => this.setDisplayed('personal')}>Personal</span></span>
            projectsToDisplay = group.map( project => {
                return (
                    <StudentProject 
                    type="group" 
                    project={project}
                    key={project.id}/>
                )
            })
        }
        if(displayedProjects === 'personal') {
            projectNav = <span><span onClick={() => this.setDisplayed('group')}>Group</span> | <span onClick={() => this.setDisplayed('personal')}><u>Personal</u></span></span>
            projectsToDisplay = personal.map( project => {
                return (
                    <StudentProject
                    type="personal"
                    project={project}
                    key={project.id}/>
                )
            })
        }
        return (
            retrievedDashboard 
            ?
            <div className="student-dashboard-main">
                <div className="student-dashboard-left-info-container">
                    <StudentDashInfo studentInfo={student} updateStudentInfo={this.updateStudentInfo}/>
                </div>
                <div className="student-dashboard-right-view">
                    <div className="student-dash-right-title">Projects</div>
                    <div className="student-dash-right-nav">
                        {projectNav}
                        <button onClick={this.addNew}>Add Project</button>
                    </div>
                    <div className="student-dash-right-projects-container">
                        {
                            addNew
                            ?
                            <NewProject 
                            type={displayedProjects}
                            cancel={this.cancel}/>
                            :
                            projectsToDisplay.length 
                            ?
                            projectsToDisplay
                            :
                            <div>No projects</div>
                        }
                    </div>
                </div>
            </div>
            :
            <div className="student-dashboard-main">
                Loading Dashboard!
            </div>
        )
    }
}