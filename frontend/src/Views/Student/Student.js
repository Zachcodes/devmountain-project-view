import React, {Component} from 'react'
import axios from 'axios';
import placeholder from '../../images/thumbnail_placeholder.png';
import './Student.css'

export default class Student extends Component {
    constructor() {
        super()
        this.state = {
            first: '',
            last: '',
            projects: [],
            image: '',
            about: '',
            doneLoading: false
        }
    }
    componentDidMount() {
        axios.get(`/api/students/${this.props.match.params.studentid}`).then( response => {
            let {data} = response;
            let first, last, about;
            let projects = [];
            let image;
            for(let i = 0; i < data.length; i++) {
                if(!first) first = data[i].first 
                if(!last) last = data[i].last 
                if(!about) about = data[i].about 
                if(!image) image = data[i].image 
                let tempProject = {
                    projectName: data[i].project_name,
                    url: data[i].url,
                    projectType: data[i].project_type,
                    projectImage: data[i].image_url
                }
                projects.push(tempProject)
            }
            this.setState({
                first, 
                last,
                projects,
                image,
                about,
                doneLoading: true
            })

        })
    }

    openWindow = (url) => {
        window.open(url)
    }

    render() {
        let {doneLoading, first, last, projects, about, image} = this.state

        //styles 
        let studentLeftPicture = {
            width: '100%',
            height: '40%',
            background: `url(${image}) no-repeat`,
            backgroundSize: 'contain',
            backgroundPosition: 'center top'
        }
        let studentRightPicture = {
            width: '100%',
            height: '40%',
            background: `url(${placeholder}) no-repeat`,
            backgroundSize: 'contain',
            backgroundPosition: 'center top'
        }
        
        return (
            doneLoading 
            ?
            <div className="student-main-container">

                <div className="student-left-main-container">
                    <div className="student-left-title">
                        {first} {last}
                    </div>
                    <div style={studentLeftPicture}></div>
                    <div className="student-left-details">
                        {about}
                    </div>
                </div>
                <div className="student-right-main-container">
                    {
                        projects.map((project, index) => {
                            let type = project.projectType === 1 ? 'Personal' : 'Group'
                            studentRightPicture.background = `url(${project.projectImage}) no-repeat`
                            return (
                                <div key={index} className="student-right-project-container">
                                    <p>{type}: {project.projectName}</p>
                                    <div style={studentRightPicture} className="project-url-link"onClick={() => this.openWindow(project.url)}></div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            :
            <div>
                Loading!
            </div>
        )
    }
}