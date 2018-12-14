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
            linkedin: '',
            github: '',
            portfolio: '',
            doneLoading: false
        }
    }
    componentDidMount() {
        this.loadProfile()
    }

    formatDbResponse(data) {
        let first, last, about, image, github, linkedin, portfolio;
        let projects = {};
        for(let i = 0; i < data.length; i++) {
            if(!first) first = data[i].first 
            if(!last) last = data[i].last 
            if(!about) about = data[i].about 
            if(!image) image = data[i].image
            if(!github && data[i].github) github = data[i].github
            if(!linkedin && data[i].linkedin) linkedin = data[i].linkedin
            if(!portfolio && data[i].portfolio) portfolio = data[i].portfolio


            if(!projects[data[i].project_id]) {
                projects[data[i].project_id] = {
                    project_id: data[i].project_id,
                    projectName: data[i].project_name,
                    url: data[i].url,
                    projectType: data[i].project_type,
                    projectImages: [data[i].image_url],
                    projectDescription: data[i].description
                } 
            }
            else {
                projects[data[i].project_id].projectImages.push(data[i].image_url)
            }
        }
        let formattedProjects = []
        for(let key in projects) formattedProjects.push(projects[key])
        return {
            first,
            last,
            projects: formattedProjects,
            image,
            about,
            github,
            linkedin,
            portfolio,
            doneLoading: true
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.studentid !== this.props.match.params.studentid) this.loadProfile()
    }

    loadProfile() {
        axios.get(`/api/students/${this.props.match.params.studentid}`).then( response => {
            let {data} = response;
            let finalState = this.formatDbResponse(data)
            this.setState(finalState)
        })
    }

    open(url) {
        url ? window.open(url) : null;
    }

    render() {
        let {doneLoading, first, last, projects, about, image, github, linkedin, portfolio} = this.state
        // TODO: remove this line of code for production
        portfolio = ''
        let {showModal, showModalSTORE} = this.props

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
                {
                    showModalSTORE
                    ?
                    <ProjectModal/>
                    :
                    null
                }
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
                                <button className={linkedin ? "social-media-button" : "social-media-button disabled-social"}
                                onClick={() => this.open(linkedin)}>LinkedIn</button>
                                <button className={github ? "social-media-button" : "social-media-button disabled-social"}
                                onClick={() => this.open(github)}>GitHub</button>
                                <button className={portfolio ? "social-media-button" : "social-media-button disabled-social"}
                                onClick={() => this.open(portfolio)}>Portfolio</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="student-projects-display-container">
                    {
                        projects.map(project => {
                            let type = project.projectType === 1 ? 'Personal' : 'Group'
                            let image = project.projectImages.length ? project.projectImages[0] : placeholder;
                            return (
                                <div key={project.project_id} className="student-project-container" onClick={() => showModal(project)}>
                                    {/* Make it so that this opens a modal for a project */}
                                    <img src={image} className="student-project-image"></img>
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

function mapStateToProps(state) {
    return {
        showModalSTORE: state.showModal
    }
}
export default connect(mapStateToProps, {showModal})(Student)