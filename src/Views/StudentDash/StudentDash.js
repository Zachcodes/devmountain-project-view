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
            addNew: true
        }
    }

    componentDidMount() {
        axios.get('/api/loadDashboard/student').then(response => {
            let {group, personal, student, cohortStudents} = response.data
            this.setState({
                group,
                personal,
                studentInfo: student,
                cohortStudents,
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

    openStudent = (id) => {
        if(id != this.state.studentInfo.id) {
            this.props.history.push(`/students/${id}`)
        }
    }

    saveChanges = (project) => {
        // console.log('project', project)
        axios.put(`/api/projects/${project.project_id}`, project).then( res => {
            let updatedProject = res.data 
            let key;
            updatedProject.project_type === 1 ? key = 'personal' : key = 'group';
            let copy = this.state[key].slice()
            let index = copy.findIndex(p => p.project_id === updatedProject.project_id)
            copy.splice(index, 1, updatedProject)
            let obj = {}
            obj[key] = copy 
            this.setState(obj)
        })
    }

    render() {
        let { studentInfo: student, retrievedDashboard, studentSettings, displayedProjects, addNew, group, personal, cohortStudents } = this.state
        let projectNav, projectsToDisplay;
        if(displayedProjects === 'group') {
            projectNav = <span className="student-dash-right-nav-span"><span onClick={() => this.setDisplayed('group')} className="student-active-nav">Group</span> <span onClick={() => this.setDisplayed('personal')}>Personal</span></span>
            projectsToDisplay = group.map( project => {
                return (
                    <StudentProject 
                    type="group" 
                    project={project}
                    key={project.project_id}
                    openStudent={this.openStudent}
                    saveChanges={this.saveChanges}
                    cohortStudents={cohortStudents}/>
                )
            })
        }
        if(displayedProjects === 'personal') {
            projectNav = <span className="student-dash-right-nav-span"><span onClick={() => this.setDisplayed('group')}>Group</span> <span onClick={() => this.setDisplayed('personal')} className="student-active-nav">Personal</span></span>
            projectsToDisplay = personal.map( project => {
                return (
                    <StudentProject
                    type="personal"
                    project={project}
                    key={project.project_id}
                    openStudent={this.openStudent}
                    saveChanges={this.saveChanges}/>
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
                        <button onClick={this.addNew} className="student-dash-right-nav-button">Add Project</button>
                    </div>
                    <div className="student-dash-right-projects-container">
                        {
                            addNew
                            ?
                            <NewProject 
                            type={displayedProjects}
                            cancel={this.cancel}
                            cohortStudents={cohortStudents}
                            cohortId={student.cohort}/>
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