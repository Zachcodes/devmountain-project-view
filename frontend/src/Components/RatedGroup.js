import React, {Component} from 'react'
import axios from 'axios'

export default class RatedGroup extends Component {
    constructor(props) {
        super(props) 
        let {rating, projectRatingId} = props.project
        this.state = {
            newRating: rating,
            projectRatingId: projectRatingId
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
                updateRatingOnProject(index, 'ratedGroup', +newRating)
            }
        })
    }

    render() {
        let {project, updateProjects} = this.props;
        let {groupMembers, projectName, rating} = project;
        let {newRating} = this.state
        return (
            <div>
                Project name: {projectName}
                {
                    groupMembers.map(member => <p key={member.studentId}>{member.studentName}</p>)
                }
                Current rating: <input value={newRating} onChange={(e) => this.handleChange(e.target.value, 'newRating')} />
                <button onClick={this.submitNewRating}>Submit new rating</button>
            </div>
        )
    }
}