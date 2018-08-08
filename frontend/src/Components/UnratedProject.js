import React, {Component} from 'react'
import axios from 'axios'

export default class UnratedPersonal extends Component {
    constructor() {
        super()
        this.state = {
            rating: 0
        }
    }
    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val 
        this.setState(obj)
    }
    submitRating = () => {
        let {rating} = this.state 
        let {project, updateProjects} = this.props 
        let {projectId} = project;
        axios.post(`/api/ratings/${projectId}?rating=${rating}`).then( response => {
            updateProjects(response.data)
        })
    }
    render() {
        let {project, type} = this.props;
        let {rating} = this.state;
        let {projectName, studentFirst, studentLast, url, groupMembers, studentName} = project;
        if(studentFirst) studentName = `${studentFirst} ${studentLast}`
        return (
            type === 'personal'
            ?
            <div>
                Project name: {projectName}
                Student name: {studentName}
                Url: {url}
                Enter rating: <input value={rating} onChange={(e) => this.handleChange(e.target.value, 'rating')}></input>
                <button onClick={this.submitRating}>Submit Rating</button>
            </div>
            :
            <div>
                Project name: {projectName}
                {
                    groupMembers.map(member => <p key={member.studentId}>{member.studentName}</p>)
                }
                Url: {url}
                Enter rating: <input value={rating} onChange={(e) => this.handleChange(e.target.value, 'rating')}></input>
                <button onClick={this.submitRating}>Submit Rating</button>
            </div>
        )
    }
}