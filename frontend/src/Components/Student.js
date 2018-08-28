import React, {Component} from 'react'
import axios from 'axios'

export default class Student extends Component {
    constructor() {
        super()
        this.state = {
            hasGroup: false,
            hasPersonal: false,
            group: [],
            personal: [],
            student: {},
            retrievedDashboard: false
        }
    }
    componentDidMount() {
        axios.get('/api/loadDashboard/student').then(response => {
            let {hasGroup, hasPersonal, group, personal, student} = response.data
            this.setState({
                hasGroup,
                hasPersonal,
                group,
                personal,
                student,
                retrievedDashboard: true
            })
        })
    }
    render() {
        let {retrievedDashboard, hasGroup, hasPersonal, group, personal, student} = this.state
        return (
            retrievedDashboard 
            ?
            <div className="student-dashboard-main">
                <div className="student-dashboard-left-container">
                    {student.first} {student.last}
                </div>
                <div className="student-dashboard-right-container">
                    {
                        hasPersonal 
                        ?
                        personal.map(project => {
                            return (
                                <div className="student-dashboard-personal-container" key={project.id}>
                                    <div className="project-container-title">Personal Project</div>
                                    <div className="personal-container-info">Project Name: {project.project_name}</div>
                                    <div className="personal-container-info">Description: {project.description}</div>
                                    <div className="personal-container-info">Project Url: {project.url}</div>
                                    <div className="personal-container-info">Walkthrough Link: {project.walkthrough_link}</div>
                                </div>
                            )
                        })
                        :
                        <div className="student-dashboard-personal-container">
                            Need to add a personal project
                        </div>
                    }
                    {
                        hasGroup 
                        ?
                        group.map(project => {
                            return (
                                <div className="student-dashboard-group-container" key={project.id}>
                                    <div className="project-container-title">Group Project</div>
                                    <div>Project Name: {project.project_name}</div>
                                    <div>Description: {project.description}</div>
                                    <div>Project Url: {project.url}</div>
                                    <div>Walkthrough Link: {project.walkthrough_link}</div>
                                    <div>
                                        {
                                            project.members.map(member => <p key={member.id}>{member.first} {member.last}</p>)
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="student-dashboard-group-container">
                            Need to add a group project
                        </div>
                    }
                </div>
            </div>
            :
            <div className="student-dashboard-main">
                Loading Dashboard!
            </div>
        )
    }
}