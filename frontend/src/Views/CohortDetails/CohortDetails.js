import React, {Component} from 'react'
import axios from 'axios';
import './CohortDetails.css'
import queryString from 'query-string'
import {Link} from 'react-router-dom'

//components
import GroupProject from '../../Components/GroupProject'
import PersonalProject from '../../Components/PersonalProject'
import StudentContainer from '../../Components/StudentContainer'

export default class CohortDetails extends Component {
    constructor() {
        super()
        this.state = {
            groupProjects: [],
            personalProjects: [],
            students: []    
        }
    }
    componentDidMount() {
        let {cohortid} = this.props.match.params;
        axios.get(`/api/cohorts/${cohortid}/projects`).then(res => {
            let personal = res.data.personalProjects;
            let group = res.data.splitGroups;
            let students = res.data.students
            let tempGroup = []
            for(let groupid in group) {
                tempGroup.push(group[groupid])
            }
            this.setState({
                groupProjects: tempGroup,
                personalProjects: personal,
                students: students
            })
        })
    }
    render() {
        let {search} = this.props.location 
        let queryValues = queryString.parse(search) 
        return (
            <div className="cohort-details-main-container">
                <div className="cohort-details-title-div">
                   Cohort {queryValues.name}
                </div>
                <div className="cohort-details-body-div">
                    <div className="cohort-details-left-container">
                        <div className="cohort-details-left-title">
                            <h2>Students</h2>
                        </div>
                        <div className="cohort-details-left-student-container">
                            {
                                this.state.students.map(student => <Link to={`/students/${student.id}`}><StudentContainer student={student}/></Link>)
                            }
                        </div>
                    </div>
                    <div className="cohort-details-right-container">
                        <div className="cohort-details-project-container">
                            <h2>Personal Projects</h2>
                            {
                                this.state.personalProjects.map( (project, index) => {
                                    return <PersonalProject key={index} projectDetails={project} />
                                })
                                
                            }
                        </div>
                        <div className="cohort-details-project-container">
                            <h2>Group Projects</h2>
                            {
                                this.state.groupProjects.map( (project, index) => {
                                    return <GroupProject key={index} projectDetails={project.projectInfo} members={project.members} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}