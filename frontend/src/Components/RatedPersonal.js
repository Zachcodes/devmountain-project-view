import React, {Component} from 'react'
import axios from 'axios'

export default class RatedPersonal extends Component {
    constructor(props) {
        super(props) 
        let {rating, project_rating_id} = props.project
        this.state = {
            newRating: rating,
            projectRatingId: project_rating_id
        }
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val 
        this.setState(obj)
    }

    submitNewRating = () => {
        let {newRating, projectRatingId} = this.state
        let {updateRatingOnProject, index} = this.props
        axios.put(`/api/ratings/${projectRatingId}?rating=${newRating}`).then(response => {
            if(response.data[0].rating === +newRating) {
                updateRatingOnProject(index, 'ratedPersonal', +newRating)
            }
        })
    }

    render() {
        let {project} = this.props;
        let {project_name, rating, student_first, student_last} = project;
        let {newRating} = this.state
        return (
            <div>
                Project name: {project_name}
                Student name: {`${student_first} ${student_last}`}
                Current rating: <input value={newRating} onChange={(e) => this.handleChange(e.target.value, 'newRating')} />
                <button onClick={this.submitNewRating}>Submit new rating</button>
            </div>
        )
    }
}