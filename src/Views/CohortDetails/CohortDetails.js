import React, {Component} from 'react'
import axios from 'axios';
import './CohortDetails.css'
import {Link} from 'react-router-dom'

//components
import CohortGroupProject from '../../Components/CohortGroupProject'
import PersonalProject from '../../Components/PersonalProject'
import StudentContainer from '../../Components/StudentContainer'
import TinyNav from '../../Components/TinyNav'
import ProjectModal from '../../Components/ProjectModal'
import {showModal} from '../../Redux/actionCreators'
import { connect } from 'react-redux';

class CohortDetails extends Component {
    constructor() {
        super()
        this.state = {
            groupProjects: [],
            students: [],
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
        let { showModalSTORE, showModal } = this.props

        let  groupClass = activeType === 'group' ? 'ch-active ch-nav' : 'ch-nav';
        let  studentClass = activeType === 'student' ? 'ch-active ch-nav' : 'ch-nav';
        return (
            <div className="ch-main-container">
                {
                    showModalSTORE
                    ?
                    <ProjectModal/>
                    :
                    null
                }
                <div className="ch-header">
                    <TinyNav/>
                    <div className="ch-header-filter-container">
                        <div><span className={groupClass} onClick={() => this.setActiveType('group')}>Group Projects</span> / <span className={studentClass} onClick={() => this.setActiveType('student')}>Students</span></div>
                    </div>
                </div>
                {
                    activeType === 'group'
                    ?
                
                    groupProjects.map( project => {
                        return (
                            <CohortGroupProject
                            project={project}
                            key={project.projectId}
                            history={this.props.history}/>
                        )
                    })

                    :
                    <div className="ch-student-wrapper">===
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        showModalSTORE: state.showModal
    }
}

export default connect(mapStateToProps, {showModal})(CohortDetails)