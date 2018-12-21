import React, {Component} from 'react'

export default class StudentProject extends Component {
    constructor(props) {
        super()
        this.state = {
            ...props.project,
            activeImageIndex: 0,
            edit: false
        }
    }
    render() {
        console.log('props in StudentProject', this.props)
        let {type} = this.props.project
        let {description, images, project_link, project_name, walkthrough_link, activeImageIndex} = this.state;
        // TODO: change this to be an actual placeholder image
        let activeImage = images.length ? images[activeImageIndex].image_url : 'https://s3-us-west-1.amazonaws.com/project-browser-development/pictures/148e1a41-b327-4652-8272-5d4f35f5b617_IMG_0359.jpg'
        let restOfImages = images.filter( (image,i) => i != activeImageIndex).map(image => <img className="student-dash-project-thumbnail" src={image.image_url}/>)
        return (
            <div className="student-dash-project">
                <div className="student-dash-project-image-container">
                    <img src={activeImage} className="student-dash-project-main-image"/>
                    <div className="student-dash-project-thumbnail-container">{restOfImages}</div>
                </div>
                <div className="student-dash-project-info-container">
                    <div className="student-dash-project-info-name">{project_name}</div>
                    <div className="student-dash-project-info-description">{description}</div>
                    <div className="student-wrapper">
                        <div className="student-dash-project-bottom-container">
                            <div className="student-dash-project-member-pictures">Project members images</div>
                            <button className="student-dash-project-info-button" onClick={() => window.open(project_link)}>View Project</button>
                            <button className="student-dash-project-info-button" onClick={() => this.setState({edit: true})}>Edit Project</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}