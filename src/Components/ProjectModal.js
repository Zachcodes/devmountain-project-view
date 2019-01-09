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

        let index = e.target.classList.contains('modal-element')
        if(!index) this.props.hideModal()
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
        let modalClass = showModal ? `project-modal-main-container modal-element` : 'project-modal-main-container hide-modal modal-element';
        return (
            <div className={modalClass}>
                <div className="project-modal-child modal-child-left modal-element">
                    <div className="project-modal-main-image modal-element">
                        <img src={images[selectedImageIndex].image_url} className="modal-element"/>
                    </div>
                    <div className="project-modal-thumbnail-container modal-element">
                        {
                            images.map( (image, i) => {
                                return (
                                    <img src={image.image_url}
                                    key={image.project_image_id}
                                    className="modal-element"/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="project-modal-child modal-child-right modal-element">
                        <div className="project-modal-name modal-element">{project_name}</div>
                        <div className="project-modal-description modal-element">{description}</div>
                        <div className="ch-project-team modal-element">
                            Team Members: 
                            {
                            groupMembers.map(m => <img src={m.student_image} 
                                        className="student-dash-member-picture modal-element" 
                                        onClick={() => this.openStudent(m.student_id)}
                                        title={`${m.student_first} ${m.student_last}`}
                                        key={m.student_id}/>)
                            }
                            <a href={url} target="_blank" className="project-modal-button modal-element"><button className="modal-element">View Project</button></a>
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