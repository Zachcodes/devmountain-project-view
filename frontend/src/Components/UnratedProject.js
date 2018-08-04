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
        //TODO: Fix this so it doesn't add in a new record when one exists
        let newRating = this.state.rating
        let {id: projectId} = this.props.project
        if(newRating >= 0 && newRating <= 5) {
            axios.post(`/api/ratings/${projectId}?rating=${newRating}`).then( response => {
                console.log('response', response)
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
        let {project_name} = this.props.project
        let {rating} = this.state
        return (
            <div>
                Student name: {project_name}
                New rating: <input value={rating} onChange={(e) => this.handleChange(e.target.value, 'rating')}/>
                <button onClick={this.submitRating}>Submit Rating</button>
            </div>
        )
    }
}