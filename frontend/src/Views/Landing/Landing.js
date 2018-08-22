import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import placeholder from '../../images/thumbnail_placeholder.png';
import './Landing.css'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            programs: [],
            featuredProject: {},
            doneLoading: false
        }
    }
    componentDidMount() {
            axios.get('/api/programs').then(programs => {
                this.setState({
                    featuredProject: programs.data.dailyProject[0],
                    doneLoading: true
                })
            }).catch(err => {
                if(err) {
                    alert('Could not get programs')
                }
            })
    }
    render() {
        let featuredImage = {
            width: '100%',
            height: '40%',
            background: `url(${placeholder}) no-repeat`,
            backgroundSize: 'contain',
            backgroundPosition: 'center top',
            marginBottom: '10px'
        }

        let {doneLoading, featuredProject} = this.state
        let {project_type, students} = featuredProject;
        return (
            doneLoading
            ?
            <div className="program-container">
                <div className="program-left-container">
                    <div className="landing-featured-container">
                        <div className="landing-featured-title">Today's Featured Project</div>
                        <div style={featuredImage}></div>
                        <div className="landing-featured-information-container">
                            <div className="landing-featured-name">
                                <div>
                                     <u>Featured Project Name</u> 
                                </div>
                                <div>
                                    {featuredProject.project_name}
                                </div>
                            </div>
                                {
                                    project_type === 1 
                                    ?
                                    <div className="landing-featured-type">
                                        <div>
                                            <u>Project Type</u>
                                        </div>
                                        <div>
                                            Personal
                                        </div>
                                    </div>  
                                    :
                                    <div className="landing-featured-type">
                                        <div>
                                            <u>Project Type</u>
                                        </div>
                                        <div>
                                            Group
                                        </div>
                                    </div> 
                                }
                                {
                                    project_type === 1 
                                    ?
                                    <div className="landing-featured-students">
                                        <div>
                                            <u>Developer</u>
                                        </div>
                                        <div>  
                                            {
                                                students.map((student, index) => <p key={`${index}_${student.first}`}>{`${student.first} ${student.last}`}</p>)
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="landing-featured-students">
                                        <div>
                                            Group Members
                                        </div>
                                        <div>
                                            {
                                                students.map((student, index) => <p key={`${index}_${student.first}`}>{`${student.first} ${student.last}`}</p>)
                                            }
                                        </div>
                                    </div>
                                }
                           
                        </div>
                    </div>
                </div>
                <div className="program-right-container">
                    <div>
                        Welcome to DevMountain's Project Browser! This project was inspired by all the excellent projects that DevMountain students have produced. These projects are seen by their mentors, instructors and fellow classmates but not many students going forward will see them. There's a lot of creativity that has gone into these projects and hopefully they can help inspire you and showcase all the hard work that has made them possible! 
                    </div>
                </div>
            </div>
            :
            <div>
                Loading!
            </div>
        )
    }
}