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

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.studentid !== this.props.match.params.studentid) this.loadProfile()
    }

    loadProfile() {
        axios.get(`/api/students/${this.props.match.params.studentid}`).then( response => {
            let {projects, student} = response.data;
            let {first, last, image, about, github, linkedin, portfolio} = student
            this.setState({
                projects,
                first,
                last,
                image,
                about,
                github,
                linkedin,
                portfolio,
                doneLoading: true
            })
        })
    }

    open(url) {
        url ? window.open(url) : null;
    }

    render() {
        let {doneLoading, first, last, projects, about, image, github, linkedin, portfolio} = this.state
        let {showModal, showModalSTORE} = this.props

        return (
            doneLoading 
            ?
            <div className="student-main-container">
                {
                    showModalSTORE
                    ?
                    <ProjectModal
                    history={this.props.history}/>
                    :
                    null
                }
                <div className="student-info-main-container">
                    {/* <TinyNav heightClass="student-tiny-nav"/> */}
                    <div className="student-position-container">
                        <div className="student-info-picture-container">
                            <img src={image}/>
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
                            let type = project.project_type === 1 ? 'Personal' : 'Group'
                            let image = project.images.length ? project.images[0].image_url : placeholder;
                            return (
                                <div key={project.project_id} className="student-project-container" onClick={() => showModal(project)}>
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