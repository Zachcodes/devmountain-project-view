import React, {Component} from 'react'
import { connect } from 'react-redux';

class ProjectModal extends Component {
    constructor() {
        super()
        this.state = {
            selectedImageIndex: 0,
            intervalId: 0
        }
    }
    componentDidMount() {
        if(!this.state.intervalId) {
            let bound = this.setSelectedImageIndex.bind(this)
            let intervalId = setInterval(bound, 5000)
            this.setState({intervalId})
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    setSelectedImageIndex() {
        let { selectedImageIndex } = this.state 
        let { selectedModalProject } = this.props 
        let { projectImages } = selectedModalProject
        if(selectedImageIndex >= projectImages.length - 1) {
            selectedImageIndex = 0
        }
        else selectedImageIndex = selectedImageIndex + 1
        this.setState({
            selectedImageIndex
        })
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
                            projectImages.map( (imageUrl, i) => {
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