import React, {Component} from 'react'
import axios from 'axios';
import placeholder from '../../images/thumbnail_placeholder.png';
import './StudentDetails.css'
import TinyNav from '../../Components/TinyNav'
import ProjectModal from '../../Components/ProjectModal'
import { connect } from 'react-redux';
import { showModal } from '../../Redux/actionCreators'

class Student extends Component {
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
            let projects = {};
            let image;
            for(let i = 0; i < data.length; i++) {
                if(!first) first = data[i].first 
                if(!last) last = data[i].last 
                if(!about) about = data[i].about 
                if(!image) image = data[i].image 

                // Setting up the project to make sure all the images are added to the array
                if(!projects[data[i].project_id]) {
                    projects[data[i].project_id] = {
                        project_id: data[i].project_id,
                        projectName: data[i].project_name,
                        url: data[i].url,
                        projectType: data[i].project_type,
                        projectImages: [data[i].image_url]
                    } 
                }
                else {
                    projects[data[i].project_id].projectImages.push(data[i].image_url)
                }
            }
            let formattedProjects = []
            for(let key in projects) formattedProjects.push(projects[key])
            this.setState({
                first, 
                last,
                projects: formattedProjects,
                image,
                about,
                doneLoading: true
            })

        })
    }

    render() {
        let {doneLoading, first, last, projects, about, image} = this.state
        let {showModal} = this.props

        //styles 
        let studentPicture = {
            width: '100%',
            height: '100%',
            maxWidth: '350px'
        }
        
        return (
            doneLoading 
            ?
            <div className="student-main-container">
                <ProjectModal/>
                <div className="student-info-main-container">
                    {/* TODO: Need to make tiny nav and have it display current route */}
                    <TinyNav heightClass="student-tiny-nav"/>
                    <div className="student-position-container">
                        <div className="student-info-picture-container">
                            <img src={image} style={studentPicture}/>
                        </div>
                        <div className="student-details-container">
                            <div className="student-text-container">
                                <span className="student-text-name">{first} {last}</span>
                                <span className="student-text">{about}</span>
                                <span className="student-text">Email: fake@email.com</span>
                            </div>
                            <div className="student-social-media-button-container">
                                {/* TODO: These buttons will need to be dynamically generated based on whether the students have added these links */}
                                <button className="social-media-button no-margin">LinkedIn</button>
                                <button className="social-media-button">GitHub</button>
                                <button className="social-media-button">Medium</button>
                                <button className="social-media-button">Portfolio</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="student-projects-display-container">
                    {
                        projects.map(project => {
                            let type = project.projectType === 1 ? 'Personal' : 'Group'
                            return (
                                <div key={project.project_id} className="student-project-container" onClick={() => showModal(project)}>
                                    {/* Make it so that this opens a modal for a project */}
                                    <img src={placeholder} className="student-project-image"></img>
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

export default connect(null, {showModal})(Student)