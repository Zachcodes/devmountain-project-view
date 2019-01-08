import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Landing.css';
import LandingImage from '../../images/landing2.jpg'
import AboutImage from '../../images/about_image.jpg'
import ProjectModal from '../../Components/ProjectModal'
import { connect } from 'react-redux';
import { showModal } from '../../Redux/actionCreators'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            programs: []
        }
    }

    openWindow = (url) => {
        window.open(url)
    }

    render() {
        let {featuredProject} = this.props
        let {description, images, project_name, type, cohort_name} = featuredProject;
        let imageUrl = images.length ? images[0].image_url : ''
        
        let landingImage = {
            width: '100%',
            height: '100%',
            opacity: .9
        }
        let {showModal, showModalSTORE} = this.props
        return (
            <div className="program-container">
                {
                    showModalSTORE
                    ?
                    <ProjectModal
                    history={this.props.history}/>
                    :
                    null
                }
                <div className="landing-main-image-container">
                    <img style={landingImage} src={LandingImage}/>
                    <div className="landing-sub-image-container">
                        <div className="landing-sub-headline">DEVMOUNTAIN PROJECT BROWSER</div>
                        <div className="landing-sub-info">This is where a brief snippet of information will go about this app. The main bulk of the information will be down below but this will be two or 3 sentences.</div>
                        <div className="landing-sub-button-container">
                        <Link to="/programs"><button className="landing-sub-button">Programs</button></Link>
                            {/* <Link onClick={this.jumpToLanding} to="/#landing-about"><button className="landing-sub-button">Learn More</button></Link> */}
                            <HashLink to="#landing-about"><button className="landing-sub-button">Learn More</button></HashLink>
                        </div>
                        <div className="landing-sub-circle-button-container">
                            <HashLink to="#featured-main">
                            <span className="landing-sub-circle-button">
                                <FontAwesomeIcon icon="arrow-down" className="arrow-down"/>
                            </span>
                            </HashLink>
                        </div>
                    </div>
                </div>
                <div className="landing-bottom-main-container">
                    <div className="featured-main-container" id="featured-main">
                        <div className="featured-title">Today's Featured Project</div>
                        <div className="featured-project-container">
                            <img className="featured-project-image" src={imageUrl}
                            onClick={() => showModal(featuredProject)}/>
                            <div className="featured-project-right">
                                <h3>{project_name}</h3>
                                <h5>{description}</h5>
                                <div className="featured-project-right-row">
                                    <h3>Program: {type}</h3>
                                    <h3>Cohort: {cohort_name}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="landing-about-main-container" name="landing-about" id="landing-about" style={{backgroundImage: `url(${AboutImage})`}}>
                        {/* <img className="landing-about-image" src={AboutImage}/> */}
                        <div className="landing-about-info-container">
                            <div className="landing-about-title">About DevMountain</div>
                            <div className="landing-about-info">DevMountain information
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        showModalSTORE: state.showModal,
        featuredProject: state.featuredProject
    }
}
export default connect(mapStateToProps, {showModal})(Home)