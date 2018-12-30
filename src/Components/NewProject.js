import React, {Component} from 'react'
import {setAvailableMembers} from '../jsutil/functions'

export default class NewProject extends Component {
    constructor(props) {
        super()
        this.state = {
          name: '',
          description: '',
          url: '',
          images: [],
          type: props.type,
          walkthroughLink: '',
          groupMembers: [],
          imageInput: '',
          availableMembers: props.cohortStudents
        }
    }

    handleChange = (key, value) => {
        let obj = {}
        obj[key] = value 
        this.setState(obj)
    }

    clear = () => {
        this.setState({
          name: '',
          description: '',
          url: '',
          images: [],
          type: this.props.type,
          walkthroughLink: '',
          groupMembers: [],
          imageInput: ''
        })
    }

    addImage = () => {
        let copy = this.state.images.slice()
        copy.push(this.state.imageInput)
        this.setState({
            images: copy,
            imageInput: ''
        })
    }

    removeImage = (index) => {
        let copy = this.state.images.slice()
        let i = copy.findIndex((image, i) => i === index)
        copy.splice(i, 1)
        this.setState({images: copy})
    }

    addGroupMember = () => {
        let select = document.getElementById('students-select-new')
        let selectedStudentValue = parseInt(select.options[select.selectedIndex].value)
        if(selectedStudentValue) {
            let copy = this.state.groupMembers.slice()
            let student = this.props.cohortStudents.find(s => s.student_id === selectedStudentValue)
            copy.push(student)
            let availableMembers = setAvailableMembers(copy, this.props.cohortStudents)
            this.setState({groupMembers: copy, availableMembers})
        }   
    }

    deleteGroupMember = (student_id) => {
        let copy = this.state.groupMembers.slice()
        let index = copy.findIndex( m => m.student_id === student_id)
        copy.splice(index, 1)
        let availableMembers = setAvailableMembers(copy, this.props.cohortStudents)
        this.setState({groupMembers: copy, availableMembers})
    }

    render() {
        let {name, description, url, images, type, groupMembers, imageInput, availableMembers} = this.state
        return (
            <div>
                <div className="new-project-main-container">
                    <div>Name: <input value={name} onChange={(e) => this.handleChange('name', e.target.value)}/></div>
                    <div>Description: <input value={description} onChange={(e) => this.handleChange('description', e.target.value)}/></div>
                    <div>Url: <input value={url} onChange={(e) => this.handleChange('url', e.target.value)}/></div>
                    <div>
                        {
                            images.map((image, index) => {
                                return (
                                    <span key={image}>
                                        <input value={image}/>
                                        <button onClick={() => this.removeImage(index)}>X</button>
                                    </span>
                                )
                            })
                        }
                        New Image: <input value={imageInput} onChange={(e) => this.handleChange('imageInput', e.target.value)}/>
                        <button onClick={this.addImage}>Add Image</button>
                    </div>
                    <div>
                        Type: 
                        {
                            type === 'personal'
                            ?
                            <select onChange={(e) => this.setState({type: e.target.options[e.target.selectedIndex].value})}>
                                <option value="personal" selected>Personal</option>
                                <option value="group">Group</option>
                            </select>
                            :
                            <select onChange={(e) => this.setState({type: e.target.options[e.target.selectedIndex].value})}>
                                <option value="personal">Personal</option>
                                <option value="group" selected>Group</option>
                            </select>
                        }
                    </div>
                    <div>
                        {
                            groupMembers.map(m => {
                                return (
                                    <div>{m.student_first} {m.student_last} <button onClick={() => this.deleteGroupMember(m.student_id)}>X</button></div>
                                )
                            })
                        }
                        <select 
                        name="cohortstudentsnew"
                        id="students-select-new">
                            <option value="0">None</option>
                            {
                                availableMembers.map(s => {
                                    return (
                                        <option value={s.student_id}>{`${s.student_first} ${s.student_last}`}</option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={this.addGroupMember}>Add Group Member</button>
                    </div>
                    <div>
                        <button>Add</button>
                        <button onClick={this.clear}>Clear</button>
                    </div>
                </div>
                <button onClick={this.props.cancel}>Cancel</button>
            </div>
        )
    }
}