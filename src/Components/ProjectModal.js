import React, {Component} from 'react'
import { connect } from 'react-redux';

class ProjectModal extends Component {
    constructor() {
        super()
        this.state = {
            selectedImageIndex: 0
        }
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
    
    render() {
        let {showModal, selectedModalProject} = this.props
        let { selectedImageIndex } = this.state;
        let { projectImages, projectName, projectType, project_id } = selectedModalProject
        let modalClass = showModal ? `project-modal-main-container` : 'project-modal-main-container hide-modal';
        return (
            <div className={modalClass}>
                <div className="project-modal-child">
                    <div className="project-modal-main-image">
                        <img src={projectImages[selectedImageIndex]} />
                    </div>
                    <div className="project-modal-thumbnail-container">
                        {
                            projectImages.filter( (image, i) => {
                                if(i !== selectedImageIndex) return true;
                            })
                            .map( (imageUrl, i) => {
                                return (
                                    <img src={imageUrl}
                                    key={i + Math.random()}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="project-modal-child">
                
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        showModal: state.showModal,
        selectedModalProject: state.selectedModalProject
    }
}

export default connect(mapStateToProps)(ProjectModal)