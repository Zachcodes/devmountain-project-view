import React, {Component} from 'react'
import axios from 'axios'

import StudentInfoEdit from './StudentInfoEdit'

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
            tags: [],
            personalFormValues: {
                pName: '',
                pUrl: '',
                pDescription: '',
                pWalkthroughLink: '',
                availableTags: [],
                selectedTags: [],
                newTags: [],
                newTag: ''
            },
            groupFormValues: {
                gName: '',
                gUrl: '',
                gDescription: '',
                gWalkthroughLink: '',
                gGroupMembers: [],
                gAvailableGroupMembers: [],
                availableTags: [],
                selectedTags: [],
                newTags: [],
                newTag: ''
            }
        }
    }

    componentDidMount() {
        axios.get('/api/loadDashboard/student').then(response => {
            let {hasGroup, hasPersonal, group, personal, student, cohortStudents, tags} = response.data
            this.setState({
                hasGroup,
                hasPersonal,
                group,
                personal,
                student,
                cohortStudents,
                tags,
                retrievedDashboard: true,
                groupFormValues: {
                    ...this.state.groupFormValues,
                    gAvailableGroupMembers: cohortStudents,
                    availableTags: tags
                },
                personalFormValues: {
                    ...this.state.personalFormValues,
                    availableTags: tags
                }
            })
        }).catch(err => console.log(err))
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
        let {cohort, id} = this.state.student
        let studentIds = [id]
        if(type === 'personal') {
            let { pName, pUrl, pDescription, pWalkthroughLink, selectedTags, newTags } = this.state.personalFormValues;
            if(!pName || !pUrl || !pDescription) return alert('A project name, url and description are required')
            let personalProject = {
                projectName: pName,
                url: pUrl,
                description: pDescription,
                walkthroughLink: pWalkthroughLink,
                projectTags: selectedTags,
                newTags, 
                studentIds,
                projectType: 1,
                cohortId: cohort
            }
            axios.post('/api/projects', personalProject).then(res => {
                this.setState({
                    hasPersonal: true,
                    personal: res.data
                })
            })
        }
        else {
            let { gName, gUrl, gDescription, gWalkthroughLink, gGroupMembers, selectedTags, newTags} = this.state.groupFormValues;
            if(!gName || !gUrl || !gDescription || !gGroupMembers.length) return alert('A project name, url, description and group members are required')
            gGroupMembers = gGroupMembers.map(member => member.id)
            let groupProject = {
                projectName: gName,
                url: gUrl,
                description: gDescription,
                walkthroughLink: gWalkthroughLink,
                studentIds: gGroupMembers, 
                projectTags: selectedTags,
                newTags, 
                projectType: 2,
                cohortId: cohort
            }
            axios.post('/api/projects', groupProject).then(res => {
                this.setState({
                    hasGroup: true,
                    group: res.data
                })
            })
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

    addTag = (stateKey, tagId) => {
        tagId = +tagId;
        let {availableTags} = this.state[stateKey];
        let selectedTagsCopy = [...this.state[stateKey].selectedTags];
        let newAvailableTags = availableTags.filter( tag => {
            if(tag.id === tagId) selectedTagsCopy.push(tag)
            return tag.id !== tagId
        })
        let newState = Object.assign({}, this.state)
        newState[stateKey] = {
            ...newState[stateKey],
            availableTags: newAvailableTags, 
            selectedTags: selectedTagsCopy
        }
        this.setState(newState)
    }

    removeTag = (stateKey, tagId) => {
        tagId = +tagId;
        let {selectedTags} = this.state[stateKey];
        let availableTagsCopy = [...this.state[stateKey].availableTags];
        let newSelectedTags = selectedTags.filter( tag => {
            if(tag.id === tagId) availableTagsCopy.push(tag)
            return tag.id !== tagId
        })
        let newState = Object.assign({}, this.state)
        newState[stateKey] = {
            ...newState[stateKey],
            availableTags: availableTagsCopy, 
            selectedTags: newSelectedTags
        }
        this.setState(newState)
    }

    removeNewTag = (stateKey, tagName) => {
        let newTags = this.state[stateKey].newTags.filter(tag => tag !== tagName)
        this.setState(state => {
            state[stateKey].newTags = newTags
            return state;
        })
    }

    handleNewTag = (stateKey, value) => {
        let newState = Object.assign({}, this.state)
        newState[stateKey].newTag = value
        this.setState(newState)
    }

    addNewTag = (e, stateKey) => {
        e.preventDefault()
        if(this.state[stateKey].newTag) {
            let copies = this.state.tags.filter( tag => {
                return tag.tag_name.toLowerCase() === this.state[stateKey].newTag.toLowerCase()
            })
            let newTagCopies = this.state[stateKey].newTags.filter( tag => {
                return tag.toLowerCase() === this.state[stateKey].newTag.toLowerCase()
            })
            if(!copies.length && !newTagCopies.length) {
                let newTagsCopy = [...this.state[stateKey].newTags]
                newTagsCopy.push(this.state[stateKey].newTag.toLowerCase())
                this.setState(state => {
                    state[stateKey].newTags = newTagsCopy
                    state[stateKey].newTag = ''
                    return state;
                })
            }
            else {
                alert('Already a tag by that name')
            }
        }
    }

    resetStudentData = (student) => {
        this.setState({student})
    }

    render() {
        let {retrievedDashboard, 
            hasGroup, 
            hasPersonal, 
            group, 
            personal, 
            student, 
            personalFormValues, 
            groupFormValues} = this.state
        let { pName, 
            pUrl, 
            pDescription, 
            pWalkthroughLink, 
            availableTags: pAvailableTags, 
            selectedTags: pSelectedTags, 
            newTag: pNewTag, 
            newTags: pNewTags} = personalFormValues;
        let { gName, 
            gUrl, 
            gDescription, 
            gWalkthroughLink, 
            gGroupMembers, 
            gAvailableGroupMembers, 
            availableTags: gAvailableTags, 
            selectedTags: gSelectedTags, 
            newTag: gNewTag, 
            newTags: gNewTags} = groupFormValues;
        return (
            retrievedDashboard 
            ?
            <div className="student-dashboard-main">
                <div className="student-dashboard-left-container">
                    {student.first} {student.last}
                    {student.about}
                    <img src={student.image} className="student-image"/>
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
                            <div className="project-container-title">Personal Project</div>
                            <form onSubmit={(e) => this.submitProject(e, 'personal')}>
                                <label>Project Name:</label> <input value={pName} onChange={(e) => this.updateFormValue('personalFormValues', 'pName', e.target.value)}></input>
                                <label>Project Url:</label> <input value={pUrl} onChange={(e) => this.updateFormValue('personalFormValues', 'pUrl', e.target.value)}></input>
                                <label>Project Description:</label> <input value={pDescription} onChange={(e) => this.updateFormValue('personalFormValues', 'pDescription', e.target.value)}></input>
                                <label>Project Walkthrough Link:</label> <input value={pWalkthroughLink} onChange={(e) => this.updateFormValue('personalFormValues', 'pWalkthroughLink', e.target.value)}></input>
                                <div>
                                    <select onChange={(e) => this.addTag('personalFormValues', e.target.value)}>
                                        <option value=""></option>
                                        {
                                            pAvailableTags.map( tag => {
                                                return (
                                                    <option key={tag.id} value={tag.id}>{tag.tag_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {
                                        pSelectedTags.map( tag => {
                                            return (
                                                <div key={tag.id}>
                                                    <p>{tag.tag_name}</p>
                                                    <button onClick={()=>this.removeTag('personalFormValues', tag.id)}>X</button>
                                                </div>
                                            )
                                        })
                                    }
                                    <label>New Tag:</label> <input value={pNewTag} onChange={e => this.handleNewTag('personalFormValues', e.target.value)}></input>
                                    <button onClick={e => this.addNewTag(e, 'personalFormValues')}>Add Tag</button>
                                    {
                                        pNewTags.map( (tag, index) => {
                                            return (
                                                <div key={`${tag}_${index}`}>
                                                    <p>{tag}</p>
                                                    <button onClick={()=>this.removeNewTag('personalFormValues', tag)}>X</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button type="submit">Submit For Approval</button>
                            </form>
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
                            <div className="project-container-title">Group Project</div>
                            <form onSubmit={(e) => this.submitProject(e, 'group')}>
                                <label>Project Name:</label> <input value={gName} onChange={(e) => this.updateFormValue('groupFormValues', 'gName', e.target.value)}></input>
                                <label>Project Url:</label> <input value={gUrl} onChange={(e) => this.updateFormValue('groupFormValues', 'gUrl', e.target.value)}></input>
                                <label>Project Description:</label> <input value={gDescription} onChange={(e) => this.updateFormValue('groupFormValues', 'gDescription', e.target.value)}></input>
                                <label>Project Walkthrough Link:</label> <input value={gWalkthroughLink} onChange={(e) => this.updateFormValue('groupFormValues', 'gWalkthroughLink', e.target.value)}></input>
                                <div>
                                    <select onChange={(e) => this.addGroupMember(e.target.value)}>
                                        <option value=""></option>
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
                                <div>
                                    <select onChange={(e) => this.addTag('groupFormValues', e.target.value)}>
                                        <option value=""></option>
                                        {
                                            gAvailableTags.map( tag => {
                                                return (
                                                    <option key={tag.id} value={tag.id}>{tag.tag_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {
                                        gSelectedTags.map( tag => {
                                            return (
                                                <div key={tag.id}>
                                                    <p>{tag.tag_name}</p>
                                                    <button onClick={()=>this.removeTag('groupFormValues', tag.id)}>X</button>
                                                </div>
                                            )
                                        })
                                    }
                                    <label>New Tag:</label> <input value={gNewTag} onChange={e => this.handleNewTag('groupFormValues', e.target.value)}></input>
                                    <button onClick={e => this.addNewTag(e, 'groupFormValues')}>Add Tag</button>
                                    {
                                        gNewTags.map( (tag, index) => {
                                            return (
                                                <div key={`${tag}_${index}`}>
                                                    <p>{tag}</p>
                                                    <button onClick={()=>this.removeNewTag('groupFormValues', tag)}>X</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button type="submit">Submit For Approval</button>
                            </form>
                        </div>
                    }
                </div>
                <StudentInfoEdit resetStudentData={this.resetStudentData}/>
            </div>
            :
            <div className="student-dashboard-main">
                Loading Dashboard!
            </div>
        )
    }
}