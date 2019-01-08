import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Landing.css';
import LandingImage from '../../images/landing2.jpg'
import AboutImage from '../../images/about_image.jpg'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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

    openWindow = (url) => {
        window.open(url)
    }

    render() {
        let {doneLoading, featuredProject} = this.state
        let {description, image_url, project_name, type, cohort_name} = featuredProject;
        let featuredImage = {
            width: '100%',
            height: '40%',
            background: `url(${image_url}) no-repeat`,
            backgroundSize: 'contain',
            backgroundPosition: 'center top',
            marginBottom: '10px'
        }
        
        let landingImage = {
            width: '100%',
            height: '100%',
            opacity: .9
        }
        return (
            doneLoading
            ?
            <div className="program-container">
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
                            <img className="featured-project-image" src={image_url}/>
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
            :
            <div>
                Loading!
            </div>
        )
    }
    // render() {
    //     let {doneLoading, featuredProject} = this.state
    //     let {project_type, students, image_url} = featuredProject;
    //     let featuredImage = {
    //         width: '100%',
    //         height: '40%',
    //         background: `url(${image_url}) no-repeat`,
    //         backgroundSize: 'contain',
    //         backgroundPosition: 'center top',
    //         marginBottom: '10px'
    //     }
    //     return (
    //         doneLoading
    //         ?
    //         <div className="program-container">
    //             <div className="program-left-container">
    //                 <div className="landing-featured-container">
    //                     <div className="landing-featured-title">Today's Featured Project</div>
    //                     <div 
    //                     className="landing-featured-image"
    //                     style={featuredImage} 
    //                     onClick={() => this.openWindow(featuredProject.url)}></div>
    //                     <div className="landing-featured-information-container">
    //                         <div className="landing-featured-name">
    //                             <div>
    //                                  <u>Featured Project Name</u> 
    //                             </div>
    //                             <div>
    //                                 {featuredProject.project_name}
    //                             </div>
    //                         </div>
    //                             {
    //                                 project_type === 1 
    //                                 ?
    //                                 <div className="landing-featured-type">
    //                                     <div>
    //                                         <u>Project Type</u>
    //                                     </div>
    //                                     <div>
    //                                         Personal
    //                                     </div>
    //                                 </div>  
    //                                 :
    //                                 <div className="landing-featured-type">
    //                                     <div>
    //                                         <u>Project Type</u>
    //                                     </div>
    //                                     <div>
    //                                         Group
    //                                     </div>
    //                                 </div> 
    //                             }
    //                             {
    //                                 project_type === 1 
    //                                 ?
    //                                 <div className="landing-featured-students">
    //                                     <div>
    //                                         <u>Developer</u>
    //                                     </div>
    //                                     <div>  
    //                                         {
    //                                             students.map((student, index) => <Link to={`/students/${student.id}`} key={`${index}_${student.first}`}><p>{`${student.first} ${student.last}`}</p></Link>)
    //                                         }
    //                                     </div>
    //                                 </div>
    //                                 :
    //                                 <div className="landing-featured-students">
    //                                     <div>
    //                                         <u>Group Members</u>
    //                                     </div>
    //                                     <div>
    //                                         {
    //                                             students.map((student, index) => <Link to={`/students/${student.id}`} key={`${index}_${student.first}`}><p>{`${student.first} ${student.last}`}</p></Link>)
    //                                         }
    //                                     </div>
    //                                 </div>
    //                             }
                           
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="program-right-container">
    //                 <div>
    //                     Welcome to DevMountain's Project Browser! This project was inspired by all the excellent projects that DevMountain students have produced. These projects are seen by their mentors, instructors and fellow classmates but not many students going forward will see them. There's a lot of creativity that has gone into these projects and hopefully they can help inspire you and showcase all the hard work that has made them possible! 
    //                 </div>
    //             </div>
    //         </div>
    //         :
    //         <div>
    //             Loading!
    //         </div>
    //     )
    // }
}