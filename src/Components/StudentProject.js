import React, {Component} from 'react'

export default class StudentProject extends Component {
    constructor(props) {
        super()
        this.state = {
            ...props.project,
            activeImageIndex: 0,
            edit: false,
            newImage: '',
            addedImages: []
        }
    }

    handleChange = (value, key) => {
        let obj = {}
        obj[key] = value 
        this.setState(obj)
    }

    handleImageChange = (value, key, imageId) => {
        let obj = {}
        let updatedImages = this.state[key].map( image => {
            if(image.project_image_id === imageId) {
                let copy = {...image}
                copy.image_url = value 
                return copy
            }
            else {
                return image
            }
        })
        obj[key] = updatedImages
        this.setState(obj)
    }

    addNewImage = () => {
       let tempId;
       let copy = this.state.addedImages.slice()
       copy.length ? tempId = copy[copy.length -1].project_image_id + 1 : tempId = 1;
       copy.push({project_image_id: tempId, image_url: this.state.newImage})
       this.setState({
           addedImages: copy,
           newImage: ''
       })
    }

    render() {
        let {description, images, project_link, project_name, walkthrough_link, activeImageIndex, members, type, edit, newImage, addedImages} = this.state;
        // TODO: change this to be an actual placeholder image
        let activeImage = images.length ? images[activeImageIndex].image_url : 'https://s3-us-west-1.amazonaws.com/project-browser-development/pictures/148e1a41-b327-4652-8272-5d4f35f5b617_IMG_0359.jpg'
        let restOfImages = images.filter( (image,i) => i != activeImageIndex).map(image => <img className="student-dash-project-thumbnail" src={image.image_url}/>)
        return (
            edit 
            ?
            <div className="student-dash-project editing">
                Project Name: <input value={project_name} onChange={(e) => this.handleChange(e.target.value, 'project_name')}/>
                Project Description: <input value={description} onChange={(e) => this.handleChange(e.target.value, 'description')}/>
                Project Link: <input value={project_link} onChange={(e) => this.handleChange(e.target.value, 'project_link')}/>
                {
                    images.map( i =>  {
                        return (
                            <div key={i.project_image_id}>
                                Image Url: <input value={i.image_url} onChange={(e) => this.handleImageChange(e.target.value, 'images', i.project_image_id)}/>
                            </div>
                        )
                    })
                }
                {
                    addedImages.map( i =>  {
                        return (
                            <div key={i.project_image_id}>
                                Image Url: <input value={i.image_url} onChange={(e) => this.handleImageChange(e.target.value, 'addedImages', i.project_image_id)}/>
                            </div>
                        )
                    })
                }
                New Image Url: <input value={newImage} onChange={(e) => this.handleChange(e.target.value, 'newImage')}/><button onClick={this.addNewImage}>Add New Image</button>
                <button onClick={() => this.setState({edit: false})}>Cancel</button>
            </div>
            :
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
                            <div className="student-dash-project-member-pictures">
                            {
                                members.map(m => <img src={m.student_image} 
                                                  className="student-dash-member-picture" 
                                                  onClick={() => this.props.openStudent(m.student_id)}
                                                  title={`${m.student_first} ${m.student_last}`}/>)
                            }
                            </div>
                            <button className="student-dash-project-info-button" onClick={() => window.open(project_link)}>View Project</button>
                            <button className="student-dash-project-info-button" onClick={() => this.setState({edit: true})}>Edit Project</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}