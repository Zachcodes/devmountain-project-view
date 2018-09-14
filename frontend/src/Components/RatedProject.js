import React, {Component} from 'react'
import axios from 'axios'

export default class RatedPersonal extends Component {
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
        if(newRating < 0 || newRating > 5) {
            this.setState({
                newRating: this.props.project.rating
            }, () => alert('Rating must be between 0 and 5'))
        } 
        else {
            axios.put(`/api/ratings/${projectRatingId}?rating=${newRating}`).then(response => {
                if(response.data[0].rating === +newRating) {
                    updateRatingOnProject(index, 'ratedPersonal', +newRating)
                }
            })
        }
    }

    deleteRating = () => {
        let {projectRatingId} = this.state;
        let {updateProjects} = this.props;
        axios.delete(`/api/ratings/${projectRatingId}`).then(response => {
            updateProjects(response.data, 'Successfully deleted rating')
        })
    }

    render() {
        let styles = {
            ratedMainContainer: {
                display: 'flex',
                flexDirection: 'column',
            }
        }
        let {project, type} = this.props;
        let {projectName, studentName, studentLast, studentFirst, groupMembers} = project;
        let {newRating} = this.state
        if(studentLast) studentName = `${studentFirst} ${studentLast}`
        return (
            type === 'personal'
            ?
            <div style={styles.ratedMainContainer}>
                Project name: {projectName}
                Student name: {studentName}
                Current rating: <input value={newRating} onChange={(e) => this.handleChange(e.target.value, 'newRating')} />
                <button onClick={this.submitNewRating}>Update Rating</button>
                <button onClick={this.deleteRating}>Delete Rating</button>
            </div>
            :
            <div style={styles.ratedMainContainer}>
                Project name: {projectName}
                {
                    groupMembers.map(member => <p key={member.studentId}>{member.studentName}</p>)
                }
                Current rating: <input value={newRating} onChange={(e) => this.handleChange(e.target.value, 'newRating')} />
                <button onClick={this.submitNewRating}>Update Rating</button>
                <button onClick={this.deleteRating}>Delete Rating</button>
            </div>
        )
    }
}