import React, {Component} from 'react'

export default class GroupProject extends Component {
    constructor() {
        super()
        this.state = {
            selectedImageIndex: 0
        }
    }

    setSelected(index) {
        this.setState({
            selectedImageIndex: index
        })
    }

    openStudent = (id) => {
        this.props.history.push(`/students/${id}`)
    }
    render() {
        let {selectedImageIndex} = this.state
        let {project} = this.props
        return (
            <div className="ch-group-container"
            key={project.projectId}>
                <div className="ch-group-left">
                <div className="ch-group-main-image">
                    <img src={project.projectImages[selectedImageIndex]}/>
                </div>
                <div className="ch-group-thumbnail-container">
                    {
                        project.projectImages.map( (image, i) => {
                            return (
                                <img src={image}
                                key={i + Math.random()}
                                onClick={() => this.setSelected(i)}/>
                            )
                        })
                    }
                </div>
                </div>
                <div className="ch-group-right">
                    <div className="ch-project-name">{project.projectName}</div>
                    <div className="ch-project-description">{project.description}</div>
                    <div className="ch-project-team">
                    Team Members: 
                        {
                        project.groupMembers.map(m => <img src={m.studentImage} 
                                    className="student-dash-member-picture" 
                                    onClick={() => this.openStudent(m.studentId)}
                                    title={`${m.studentName}`}/>)
                        }
                    <a href={project.url} target="_blank" className="ch-view-button"><button className="button-hover">View Project</button></a>
                    </div>
                </div> 
            </div>
        )
    }
}