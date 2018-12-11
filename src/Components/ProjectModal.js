import React, {Component} from 'react'
import { connect } from 'react-redux';

class ProjectModal extends Component {
    render() {
        let {showModal} = this.props
        let modalClass = showModal ? `project-modal-main-container` : 'project-modal-main-container hide-modal';
        return (
            <div className={modalClass}>
                Project Modal!
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        showModal: state.showModal
    }
}

export default connect(mapStateToProps)(ProjectModal)