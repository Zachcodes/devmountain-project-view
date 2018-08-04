import React, {Component} from 'react'
import axios from 'axios'

export default class UnratedProject extends Component {
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
        let newRating = this.state.rating
        let {project_id: projectId} = this.props.project
        if(newRating >= 0 && newRating <= 5) {
            axios.post(`/api/ratings/${projectId}?rating=${newRating}`).then( response => {
                this.props.updateProjects(response.data)
            })
        }
        else {
            alert('Rating must be between 0 and 5')
            this.setState({
                rating: 0
            })
        }
    }
    render() {
        let {project_name, first, last} = this.props.project
        let {rating} = this.state
        return (
            <div>
                Student name: {first} {last}
                New rating: <input value={rating} onChange={(e) => this.handleChange(e.target.value, 'rating')}/>
                <button onClick={this.submitRating}>Submit Rating</button>
            </div>
        )
    }
}