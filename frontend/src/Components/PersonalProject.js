import React from 'react'
import '../css/main.css'

export default function PersonalProject(props) {
    let {projectDetails} = props
    function openWindow(url) {
        window.open(url)
    }
    return (
        <div className="personal-project-container">   
            <div>Student: {projectDetails.first} {projectDetails.last}</div>
            <div>Project name: {projectDetails.project_name}</div>
            <div>Url: {projectDetails.url}</div>
            <button onClick={() => openWindow(projectDetails.url)}>View Project!</button>
        </div>
    )
}