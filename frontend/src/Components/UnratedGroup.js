import React, {Component} from 'react'
import axios from 'axios'

export default class UnratedGroup extends Component {
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
        let {projectId, updateProjects} = this.props 
        axios.post(`/api/ratings/${projectId}`).then( response => {
            updateProjects(response.data)
        })
    }
    render() {
        let {project, updateProjects} = this.props 
        let {projectName, groupMembers} = project
        let {rating} = this.state
        console.log('unrated', project)
        return (
        <div>
            Project name: {projectName}
            {
                groupMembers.map(member => <p key={member.studentId}>{member.studentName}</p>)
            }
            Enter rating: <input value={rating} onChange={(e) => this.handleChange(e.target.value, 'rating')}></input>
            <button onClick={this.submitRating}>Submit Rating</button>
        </div>
        )
    }

}