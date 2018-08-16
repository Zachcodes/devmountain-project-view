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
            grabbedData: false,
            doneLoading: false
        }
    }
    componentDidMount() {
            axios.get('/api/programs').then(programs => {
                this.setState({
                    programs: programs.data.types,
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
            backgroundPosition: 'center top'
        }

        let {doneLoading, programs, featuredProject} = this.state
        let {first, last} = featuredProject;
        let studentName = `${first} ${last}`
        return (
            doneLoading
            ?
            <div className="program-container">
                <div className="program-left-container">
                    <div className="landing-featured-container">
                        <div>Today's Featured Project</div>
                        <div>{studentName}</div>
                        Featured Project Name: {featuredProject.project_name}
                        <div style={featuredImage}></div>
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