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
            students: [],
            loaded: false,
            filterVal: '',
            projectTypeFilter: 0
        }
    }

    componentDidMount() {
        this.loadDefault()
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val;
        this.setState(obj)
    }

    submitFilter = (e) => {
        e.preventDefault()
        let {cohortid} = this.props.match.params;
        let {filterVal, projectTypeFilter} = this.state
        axios.get(`/api/filter/${cohortid}?projectType=${projectTypeFilter}&filter=${filterVal}`).then( response => {
            let {groupProjects, personalProjects} = response.data;
            let tempGroup = []
            for(let groupid in groupProjects) {
                tempGroup.push(groupProjects[groupid])
            }

            this.setState({
                personalProjects,
                groupProjects: tempGroup
            })
        })
    }

    loadDefault = () => {
        let {cohortid} = this.props.match.params;
        axios.get(`/api/cohorts/${cohortid}/projects`).then(res => {
            let personal = res.data.personalProjects;
            console.log(personal)
            let group = res.data.groupProjects;
            let students = res.data.students

            this.setState({
                groupProjects: group,
                personalProjects: personal,
                students: students, 
                loaded: true,
                filterVal: '',
                projectTypeFilter: 0
            })
        })
    }

    render() {
        let {search} = this.props.location 
        let queryValues = queryString.parse(search) 
        let {filterVal, projectTypeFilter} = this.state
        return (
            this.state.loaded 
            ?
            <div className="cohort-details-main-container">
                <div className="cohort-details-title-div">
                   Cohort {queryValues.name}
                </div>
                <div className="cohort-details-body-div">
                    <div className="cohort-details-left-container">
                        <div className="left-container-title">
                            <h2>Students</h2>
                        </div>
                        <div className="cohort-details-left-student-container">
                            {
                                this.state.students.map(student => {
                                    return (
                                        <Link 
                                        to={`/students/${student.id}`}
                                        key={student.id}>
                                            <StudentContainer student={student}/>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="cohort-details-right-container">
                        <div className="cohort-details-project-main-container">
                            <div className="right-container-title">Projects</div>
                            <div className="cohort-details-title">Personal</div>
                            <div className="cohort-details-project-container">
                                {
                                    this.state.personalProjects.map( (project, index) => {
                                        return (
                                            <PersonalProject 
                                            key={project.projectId} 
                                            projectDetails={project} />
                                        )
                                    })
                                    
                                }
                            </div>
                        </div>
                        <div className="cohort-details-project-main-container">
                            <div className="cohort-details-title">Group</div>
                            <div className="cohort-details-project-container">
                                {
                                    this.state.groupProjects.map( (project, index) => {
                                        return (
                                            <GroupProject key={project.projectId}
                                            projectName={project.projectName} 
                                            members={project.groupMembers} 
                                            url={project.url}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <form className="cohort-details-filter-container"
                    onSubmit={this.submitFilter}>
                        <div>Filter Projects</div>
                        <div className="cohort-details-filter-type">
                            <label>
                            <span>Type:</span>
                                <select 
                                value={projectTypeFilter}
                                onChange={(e) => this.handleChange(e.target.value, 'projectTypeFilter')}>
                                    <option value=""></option>
                                    <option value="1">Personal</option>
                                    <option value="2">group</option>
                                </select>
                            </label>
                        </div>
                        <div className="cohort-details-filter-input">
                                <label>
                                     Filter by tag: <input value={filterVal} onChange={ (e) => {this.handleChange(e.target.value, 'filterVal')} }></input>   
                                </label>
                        </div>
                        <div className="cohort-details-filter-submit">
                            <input 
                            type="submit"
                            value="Submit"
                            />
                            <button onClick={this.loadDefault}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
            :
            <div>
                Loading!
            </div>
        )
    }
}