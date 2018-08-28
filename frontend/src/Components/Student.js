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
            cohortStudents: [],
            retrievedDashboard: false,
            personalFormValues: {
                pName: '',
                pUrl: '',
                pDescription: '',
                pWalkthroughLink: ''
            },
            groupFormValues: {
                gName: '',
                gUrl: '',
                gDescription: '',
                gWalkthroughLink: '',
                gGroupMembers: [],
                gAvailableGroupMembers: []
            }
        }
    }

    componentDidMount() {
        axios.get('/api/loadDashboard/student').then(response => {
            let {hasGroup, hasPersonal, group, personal, student, cohortStudents} = response.data
            this.setState({
                hasGroup,
                hasPersonal,
                group,
                personal,
                student,
                cohortStudents,
                retrievedDashboard: true,
                groupFormValues: {
                    ...this.state.groupFormValues,
                    gAvailableGroupMembers: cohortStudents
                }
            })
        })
    }

    updateFormValue = (stateKey, formKey, value) => {
        let obj = Object.assign({}, this.state[stateKey])
        obj[formKey] = value;
        let newState = Object.assign({}, this.state)
        newState[stateKey] = obj
        this.setState(newState)
    }

    submitProject = (e, type) => {
        e.preventDefault()
        if(type === 'personal') {
            let { pName, pUrl, pDescription, pWalkthroughLink } = this.state.personalFormValues;
            if(!pName || !pUrl || !pDescription) return alert('A project name, url and description are required')
            //submit at this point
        }
        else {

        }
    }

    removeGroupMember = (studentId) => {
        studentId = +studentId
        let {gGroupMembers} = this.state.groupFormValues;
        let gAvailableGroupMembersCopy = [...this.state.groupFormValues.gAvailableGroupMembers];
        let newGroupMembers = gGroupMembers.filter( student => {
            if(student.id === studentId) gAvailableGroupMembersCopy.push(student)
            return student.id !== studentId
        })
        this.setState({
            groupFormValues: {
                ...this.state.groupFormValues,
                gGroupMembers: newGroupMembers, 
                gAvailableGroupMembers: gAvailableGroupMembersCopy
            }
        })
    }

    addGroupMember = (studentId) => {
        studentId = +studentId
        let {gAvailableGroupMembers} = this.state.groupFormValues;
        let gGroupMembersCopy = [...this.state.groupFormValues.gGroupMembers];
        let newAvailableMembers = gAvailableGroupMembers.filter( student => {
            if(student.id === studentId) gGroupMembersCopy.push(student)
            return student.id !== studentId
        })
        this.setState({
            groupFormValues: {
                ...this.state.groupFormValues,
                gGroupMembers: gGroupMembersCopy, 
                gAvailableGroupMembers: newAvailableMembers
            }
        })
    }

    render() {
        let {retrievedDashboard, hasGroup, hasPersonal, group, personal, student, personalFormValues, groupFormValues} = this.state
        let { pName, pUrl, pDescription, pWalkthroughLink} = personalFormValues;
        let { gName, gUrl, gDescription, gWalkthroughLink, gGroupMembers, gAvailableGroupMembers} = groupFormValues;
        return (
            retrievedDashboard 
            ?
            <div className="student-dashboard-main">
                <div className="student-dashboard-left-container">
                    {student.first} {student.last}
                </div>
                <div className="student-dashboard-right-container">
                    {
                        !hasPersonal 
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
                            <div className="project-container-title">Personal Project</div>
                            <form onSubmit={(e) => this.submitProject(e, 'personal')}>
                                <label>Project Name:</label> <input value={pName} onChange={(e) => this.updateFormValue('personalFormValues', 'pName', e.target.value)}></input>
                                <label>Project Url:</label> <input value={pUrl} onChange={(e) => this.updateFormValue('personalFormValues', 'pUrl', e.target.value)}></input>
                                <label>Project Description:</label> <input value={pDescription} onChange={(e) => this.updateFormValue('personalFormValues', 'pDescription', e.target.value)}></input>
                                <label>Project Walkthrough Link:</label> <input value={pWalkthroughLink} onChange={(e) => this.updateFormValue('personalFormValues', 'pWalkthroughLink', e.target.value)}></input>
                                <button type="submit">Submit For Approval</button>
                            </form>
                        </div>
                    }
                    {
                        !hasGroup 
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
                            <div className="project-container-title">Group Project</div>
                            <form>
                                <label>Project Name:</label> <input value={gName} onChange={(e) => this.updateFormValue('groupFormValues', 'gName', e.target.value)}></input>
                                <label>Project Url:</label> <input value={gUrl} onChange={(e) => this.updateFormValue('groupFormValues', 'gUrl', e.target.value)}></input>
                                <label>Project Description:</label> <input value={gDescription} onChange={(e) => this.updateFormValue('groupFormValues', 'gDescription', e.target.value)}></input>
                                <label>Project Walkthrough Link:</label> <input value={gWalkthroughLink} onChange={(e) => this.updateFormValue('groupFormValues', 'gWalkthroughLink', e.target.value)}></input>
                                <div>
                                    <select onChange={(e) => this.addGroupMember(e.target.value)}>
                                        <option></option>
                                        {
                                            gAvailableGroupMembers.map( student => {
                                                return (
                                                    <option key={student.id} value={student.id}>
                                                        {student.first} {student.last}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    {
                                       gGroupMembers.map( student => {
                                           return (
                                               <div key={student.id}>
                                                    <p>{student.first} {student.last}</p>
                                                    <button onClick={()=>this.removeGroupMember(student.id)}>X</button>
                                               </div>
                                           )
                                       }) 
                                    }
                                </div>
                            </form>
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