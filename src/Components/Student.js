import React, {Component} from 'react'
import axios from 'axios'

import StudentInfoEdit from './StudentInfoEdit'
import ImageUploader from './ImageUploader'

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
            activeView: 'info'
        }
    }

    componentDidMount() {
        axios.get('/api/loadDashboard/student').then(response => {
            console.log(11111)
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
            let { pName, pUrl, pDescription, pWalkthroughLink, selectedTags, newTags, mainImageUrl } = this.state.personalFormValues;
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
                cohortId: cohort,
                mainImageUrl
            }
            axios.post('/api/projects', personalProject).then(res => {
                this.setState({
                    hasPersonal: true,
                    personal: res.data
                })
            })
        }
        else {
            let { gName, gUrl, gDescription, gWalkthroughLink, gGroupMembers, selectedTags, newTags, mainImageUrl} = this.state.groupFormValues;
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
                cohortId: cohort,
                mainImageUrl
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

    updateMainProjectImageUrl = (filename, stateProperty) => {
        this.setState(state => {
            state[stateProperty].mainImageUrl = filename;
            return state;
        })
    }

    render() {
        let {retrievedDashboard, 
            hasGroup, 
            hasPersonal, 
            group, 
            personal, 
            student, 
            personalFormValues, 
            groupFormValues,
            activeView
        } = this.state
        let { pName, 
            pUrl, 
            pDescription, 
            pWalkthroughLink, 
            availableTags: pAvailableTags, 
            selectedTags: pSelectedTags, 
            newTag: pNewTag, 
            newTags: pNewTags
        } = personalFormValues;
        let { gName, 
            gUrl, 
            gDescription, 
            gWalkthroughLink, 
            gGroupMembers, 
            gAvailableGroupMembers, 
            availableTags: gAvailableTags, 
            selectedTags: gSelectedTags, 
            newTag: gNewTag, 
            newTags: gNewTags
        } = groupFormValues;

            let studentDashNav;
            if(activeView === 'Info') studentDashNav = <span><u>Info</u> | Settings | Projects</span>
            if(activeView === 'Settings') studentDashNav = <span>Info | <u>Settings</u> | Projects</span>
            if(activeView === 'Projects') studentDashNav = <span>Info | Settings | <u>Projects</u></span>
        return (
            retrievedDashboard 
            ?
            <div className="student-dashboard-main">
                <div className="student-dashboard-left-info-container">
                    <img src={student.image}/>
                    <span>{student.first} {student.last}</span>
                    <span>{student.description}</span>
                    <span>email</span>
                    <span>linkedin</span>
                    <span>github</span>
                    <span>portfolio</span>
                </div>
                <div className="student-dashboard-right-view">
                    {studentDashNav}
                </div>
            </div>
            :
            <div className="student-dashboard-main">
                Loading Dashboard!
            </div>
        )
    }
}