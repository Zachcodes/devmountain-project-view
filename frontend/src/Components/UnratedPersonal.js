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
        let {project_id, updateProjects} = this.props 
        axios.post(`/api/ratings/${project_id}?rating=${rating}`).then( response => {
            updateProjects(response.data)
        })
    }
    render() {
        let {project} = this.props;
        // TODO: Come back and make it so these are all the same props names
        let {rating} = this.state;
        return (
            <div>
                Project name: {project_name}
                Student name: {`${student_first} ${student_last}`}
                Enter rating: <input value={rating} onChange={(e) => this.handleChange(e.target.value, 'rating')}></input>
                <button onClick={this.submitRating}>Submit Rating</button>
            </div>
        )
    }
}