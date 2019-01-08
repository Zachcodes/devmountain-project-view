import React, {Component} from 'react'
import { connect } from 'react-redux';
import { hideModal } from '../Redux/actionCreators'

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
        document.addEventListener("click", this.closeModal)
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
        document.removeEventListener('click', this.closeModal)
    }

    closeModal = (e) => {
        let index = e.target.id.indexOf('p-modal')
        if(index === -1) this.props.hideModal()
    }

    setSelectedImageIndex() {
        let { selectedImageIndex } = this.state 
        let { selectedModalProject } = this.props 
        let { images } = selectedModalProject
        if(selectedImageIndex >= images.length - 1) {
            selectedImageIndex = 0
        }
        else selectedImageIndex = selectedImageIndex + 1
        this.setState({
            selectedImageIndex
        })
    }

    openStudent = (id) => {
        this.props.history.push(`/students/${id}`)
    }

    render() {
        let {showModal, selectedModalProject} = this.props
        let { selectedImageIndex } = this.state;
        let { images, project_name, project_type, description, url, groupMembers } = selectedModalProject
        console.log('groupmembers', groupMembers)
        let modalClass = showModal ? `project-modal-main-container` : 'project-modal-main-container hide-modal';
        return (
            <div className={modalClass} id="p-modal-1">
                <div className="project-modal-child modal-child-left" id="p-modal-2">
                    <div className="project-modal-main-image" id="p-modal-3">
                        <img src={images[selectedImageIndex].image_url} id="p-modal-4"/>
                    </div>
                    <div className="project-modal-thumbnail-container" id="p-modal-5">
                        {
                            images.map( (image, i) => {
                                return (
                                    <img src={image.image_url}
                                    key={i + Math.random()}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="project-modal-child modal-child-right" id="p-modal-6">
                        <div className="project-modal-name" id="p-modal-7">{project_name}</div>
                        <div className="project-modal-description" id="p-modal-8">{description}</div>
                        <div className="ch-project-team">
                            Team Members: 
                            {
                            groupMembers.map(m => <img src={m.student_image} 
                                        className="student-dash-member-picture" 
                                        onClick={() => this.openStudent(m.student_id)}
                                        title={`${m.student_first} ${m.student_last}`}/>)
                            }
                            <a href={url} target="_blank" id="p-modal-9" className="project-modal-button"><button id="p-modal-10">View Project</button></a>
                        </div>
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

export default connect(mapStateToProps, {hideModal})(ProjectModal)