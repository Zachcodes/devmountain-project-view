import React from 'react'

export default function StudentProject(props) {
    console.log('props in StudentProject', props)
    let {description, project_name, url} = props.project
    return (
        <div className="student-dash-project">
            <div>
                <img src={url}/>
                <div>Map through more project images here</div>
            </div>
            <div>
                <div>{project_name}</div>
                <div>{description}</div>
                <div>
                    <div>Project members images</div>
                    <button>View Project</button>
                    <button>Edit Project</button>
                </div>
            </div>
        </div>
    )
}