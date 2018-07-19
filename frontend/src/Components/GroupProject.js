import React from 'react'
import '../css/main.css'

export default function GroupProject(props) {
    let {projectDetails} = props
    function openWindow(url) {
        window.open(url)
    }
    return (
        <div className="personal-project-container">   
            <div>Project name: {projectDetails.project_name}</div>
            <div>Url: {projectDetails.url}</div>
            <button onClick={() => openWindow(projectDetails.url)}>View Project!</button>
        </div>
    )
}