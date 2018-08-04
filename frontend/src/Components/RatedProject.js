import React, {Component} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default class RatedProject extends Component {
    constructor() {
        super()
        this.state = {
            rating: 0
        }
    }
    componentDidMount() {
        this.setState({
            rating: this.props.project.rating
        })
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val 
        this.setState(obj)
    }

    updateRating = () => {
        let {rating} = this.state 
        let {project_rating_id: projectRatingId} = this.props.project
        axios.put(`/api/ratings/${projectRatingId}?rating=${rating}`).then( response => {
            toast.success('Successfully updated project')
        })
    }

    deleteRating = () => {
        let {project_rating_id: projectRatingId} = this.props.project
        axios.delete(`/api/ratings/${projectRatingId}`).then(response => {
            this.props.updateProjects(response.data)
        })
    }
    render() {
        let {first, project_name, last} = this.props.project
        let {rating} = this.state
        return (
            <div>
                Student name: {first} {last}
                Project name: {project_name}
                Update rating: <input value={rating} onChange={(e) => this.handleChange(e.target.value, 'rating')} />
                <button onClick={this.updateRating}>Submit new rating</button>
                <button onClick={this.deleteRating}>Delete Rating</button>
                <ToastContainer/>
            </div>
        )
    }
}