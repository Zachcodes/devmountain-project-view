import React, {Component} from 'react'
import axios from 'axios';
import './CohortDetails.css'
import queryString from 'query-string'
import {Link} from 'react-router-dom'

//components
import GroupProject from '../../Components/GroupProject'
import PersonalProject from '../../Components/PersonalProject'
import StudentContainer from '../../Components/StudentContainer'
import TinyNav from '../../Components/TinyNav'

export default class CohortDetails extends Component {
    constructor() {
        super()
        this.state = {
            groupProjects: [],
            students: [],
            loaded: false,
            activeType: 'group'
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

    setActiveType = (activeType) => {
        this.setState({
            activeType
        })
    }

    render() {
        let {groupProjects, activeType, students} = this.state

        let  groupClass = activeType === 'group' ? 'ch-active ch-nav' : 'ch-nav';
        let  studentClass = activeType === 'student' ? 'ch-active ch-nav' : 'ch-nav';
        return (
            this.state.loaded 
            ?
            <div className="ch-main-container">
                <div className="ch-header">
                    <TinyNav/>
                    <div className="ch-header-filter-container">
                        <div><span className={groupClass} onClick={() => this.setActiveType('group')}>Group Projects</span> / <span className={studentClass} onClick={() => this.setActiveType('student')}>Students</span></div>
                    </div>
                </div>
                {
                    activeType === 'group'
                    ?
                
                    groupProjects.map( projectDetails => {
                        return (
                            <div className="ch-group-container"
                            key={projectDetails.projectId}>
                                <div className="ch-group-left">
                                    <img src={projectDetails.mainImageUrl}/>
                                </div>
                                <div className="ch-group-right">
                                    <div className="ch-project-name">{projectDetails.projectName}</div>
                                    <div className="ch-project-description">{projectDetails.description}</div>
                                    <div className="ch-project-team">Team Members: {
                                        projectDetails.groupMembers.map((student, i, a) => {
                                            return (
                                                i === a.length - 1
                                                ?
                                                <Link to={`/students/${student.studentId}`}><u key={student.studentId}>{student.studentName}</u></Link>
                                                :
                                                <Link to={`/students/${student.studentId}`}><u key={student.studentId}>{student.studentName}, </u></Link>
                                            )
                                    })
                                    }</div>
                                </div> 
                            </div>
                        )
                    })

                    :
                    <div className="ch-student-wrapper">
                        {  
                            students.map( student => {
                                return (
                                    <div className="ch-student-container"
                                    key={student.id}>
                                        <span className="ch-student-name">{student.first} {student.last}</span>
                                        <Link to={`/students/${student.id}`}
                                        className="ch-student-image">
                                            <img src={student.image}/>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    groupProjects.map( projectDetails => {
                        return (
                            <div className="ch-group-container ch-1"
                            key={projectDetails.projectId}>
                                <div className="ch-group-left">
                                    <img src={projectDetails.mainImageUrl}/>
                                </div>
                                <div className="ch-group-right">
                                    <div className="ch-project-name ch-2">{projectDetails.projectName}</div>
                                    <div className="ch-project-description ch-3">{projectDetails.description}</div>
                                    <div className="ch-project-team ch-3">Team Members: {
                                        projectDetails.groupMembers.map((student, i, a) => {
                                            return (
                                                i === a.length - 1
                                                ?
                                                <Link to={`/students/${student.studentId}`}><u key={student.studentId} className="ch-3">{student.studentName}</u></Link>
                                                :
                                                <Link to={`/students/${student.studentId}`}><u key={student.studentId} className="ch-3">{student.studentName}, </u></Link>
                                            )
                                    })
                                    }</div>
                                </div> 
                            </div>
                        )
                    })
                }
            </div>
            :
            <div>
                Loading!
            </div>
        )
    }
}