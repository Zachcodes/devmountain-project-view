import React, {Component} from 'react'
import axios from 'axios'
import './StudentDash.css'

import StudentDashInfo from '../../Components/StudentDashInfo'
import StudentDashSettings from '../../Components/StudentDashSettings'

export default class Student extends Component {
    constructor() {
        super()
        this.state = {
            hasGroup: false,
            hasPersonal: false,
            group: [],
            personal: [],
            studentInfo: {},
            studentSettings: {},
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
                newTag: '',
                mainImageUrl: ''
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
                newTag: '',
                mainImageUrl: ''
            },
            displayedProjects: 'group'
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
                studentInfo: student,
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

    // updateFormValue = (stateKey, formKey, value) => {
    //     let obj = Object.assign({}, this.state[stateKey])
    //     obj[formKey] = value;
    //     let newState = Object.assign({}, this.state)
    //     newState[stateKey] = obj
    //     this.setState(newState)
    // }

    // submitProject = (e, type) => {
    //     e.preventDefault()
    //     let {cohort, id} = this.state.student
    //     let studentIds = [id]
    //     if(type === 'personal') {
    //         let { pName, pUrl, pDescription, pWalkthroughLink, selectedTags, newTags, mainImageUrl } = this.state.personalFormValues;
    //         if(!pName || !pUrl || !pDescription) return alert('A project name, url and description are required')
    //         let personalProject = {
    //             projectName: pName,
    //             url: pUrl,
    //             description: pDescription,
    //             walkthroughLink: pWalkthroughLink,
    //             projectTags: selectedTags,
    //             newTags, 
    //             studentIds,
    //             projectType: 1,
    //             cohortId: cohort,
    //             mainImageUrl
    //         }
    //         axios.post('/api/projects', personalProject).then(res => {
    //             this.setState({
    //                 hasPersonal: true,
    //                 personal: res.data
    //             })
    //         })
    //     }
    //     else {
    //         let { gName, gUrl, gDescription, gWalkthroughLink, gGroupMembers, selectedTags, newTags, mainImageUrl} = this.state.groupFormValues;
    //         if(!gName || !gUrl || !gDescription || !gGroupMembers.length) return alert('A project name, url, description and group members are required')
    //         gGroupMembers = gGroupMembers.map(member => member.id)
    //         let groupProject = {
    //             projectName: gName,
    //             url: gUrl,
    //             description: gDescription,
    //             walkthroughLink: gWalkthroughLink,
    //             studentIds: gGroupMembers, 
    //             projectTags: selectedTags,
    //             newTags, 
    //             projectType: 2,
    //             cohortId: cohort,
    //             mainImageUrl
    //         }
    //         axios.post('/api/projects', groupProject).then(res => {
    //             this.setState({
    //                 hasGroup: true,
    //                 group: res.data
    //             })
    //         })
    //     }
    // }

    // removeGroupMember = (studentId) => {
    //     studentId = +studentId
    //     let {gGroupMembers} = this.state.groupFormValues;
    //     let gAvailableGroupMembersCopy = [...this.state.groupFormValues.gAvailableGroupMembers];
    //     let newGroupMembers = gGroupMembers.filter( student => {
    //         if(student.id === studentId) gAvailableGroupMembersCopy.push(student)
    //         return student.id !== studentId
    //     })
    //     this.setState({
    //         groupFormValues: {
    //             ...this.state.groupFormValues,
    //             gGroupMembers: newGroupMembers, 
    //             gAvailableGroupMembers: gAvailableGroupMembersCopy
    //         }
    //     })
    // }

    // addGroupMember = (studentId) => {
    //     studentId = +studentId
    //     let {gAvailableGroupMembers} = this.state.groupFormValues;
    //     let gGroupMembersCopy = [...this.state.groupFormValues.gGroupMembers];
    //     let newAvailableMembers = gAvailableGroupMembers.filter( student => {
    //         if(student.id === studentId) gGroupMembersCopy.push(student)
    //         return student.id !== studentId
    //     })
    //     this.setState({
    //         groupFormValues: {
    //             ...this.state.groupFormValues,
    //             gGroupMembers: gGroupMembersCopy, 
    //             gAvailableGroupMembers: newAvailableMembers
    //         }
    //     })
    // }

    // addTag = (stateKey, tagId) => {
    //     tagId = +tagId;
    //     let {availableTags} = this.state[stateKey];
    //     let selectedTagsCopy = [...this.state[stateKey].selectedTags];
    //     let newAvailableTags = availableTags.filter( tag => {
    //         if(tag.id === tagId) selectedTagsCopy.push(tag)
    //         return tag.id !== tagId
    //     })
    //     let newState = Object.assign({}, this.state)
    //     newState[stateKey] = {
    //         ...newState[stateKey],
    //         availableTags: newAvailableTags, 
    //         selectedTags: selectedTagsCopy
    //     }
    //     this.setState(newState)
    // }

    // removeTag = (stateKey, tagId) => {
    //     tagId = +tagId;
    //     let {selectedTags} = this.state[stateKey];
    //     let availableTagsCopy = [...this.state[stateKey].availableTags];
    //     let newSelectedTags = selectedTags.filter( tag => {
    //         if(tag.id === tagId) availableTagsCopy.push(tag)
    //         return tag.id !== tagId
    //     })
    //     let newState = Object.assign({}, this.state)
    //     newState[stateKey] = {
    //         ...newState[stateKey],
    //         availableTags: availableTagsCopy, 
    //         selectedTags: newSelectedTags
    //     }
    //     this.setState(newState)
    // }

    // removeNewTag = (stateKey, tagName) => {
    //     let newTags = this.state[stateKey].newTags.filter(tag => tag !== tagName)
    //     this.setState(state => {
    //         state[stateKey].newTags = newTags
    //         return state;
    //     })
    // }

    // handleNewTag = (stateKey, value) => {
    //     let newState = Object.assign({}, this.state)
    //     newState[stateKey].newTag = value
    //     this.setState(newState)
    // }

    // addNewTag = (e, stateKey) => {
    //     e.preventDefault()
    //     if(this.state[stateKey].newTag) {
    //         let copies = this.state.tags.filter( tag => {
    //             return tag.tag_name.toLowerCase() === this.state[stateKey].newTag.toLowerCase()
    //         })
    //         let newTagCopies = this.state[stateKey].newTags.filter( tag => {
    //             return tag.toLowerCase() === this.state[stateKey].newTag.toLowerCase()
    //         })
    //         if(!copies.length && !newTagCopies.length) {
    //             let newTagsCopy = [...this.state[stateKey].newTags]
    //             newTagsCopy.push(this.state[stateKey].newTag.toLowerCase())
    //             this.setState(state => {
    //                 state[stateKey].newTags = newTagsCopy
    //                 state[stateKey].newTag = ''
    //                 return state;
    //             })
    //         }
    //         else {
    //             alert('Already a tag by that name')
    //         }
    //     }
    // }

    // resetStudentData = (student) => {
    //     this.setState({student})
    // }

    // updateMainProjectImageUrl = (filename, stateProperty) => {
    //     this.setState(state => {
    //         state[stateProperty].mainImageUrl = filename;
    //         return state;
    //     })
    // }
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

    render() {
        let { studentInfo: student, retrievedDashboard, studentSettings, displayedProjects } = this.state
        let projectNav;
        if(displayedProjects === 'group') projectNav = <span><span onClick={() => this.setDisplayed('group')}><u>Group</u></span> | <span onClick={() => this.setDisplayed('personal')}>Personal</span></span>
        if(displayedProjects === 'personal') projectNav = <span><span onClick={() => this.setDisplayed('group')}>Group</span> | <span onClick={() => this.setDisplayed('personal')}><u>Personal</u></span></span>
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
                        <button>Add Project</button>
                    </div>
                    <div className="student-dash-right-projects-container">
                        Projects displayed
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