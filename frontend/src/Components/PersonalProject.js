import React from 'react'
import placeholder from '../images/thumbnail_placeholder.png'


export default function PersonalProject(props) {
    let {projectName, studentFirst, studentLast, url} = props.projectDetails
    function openWindow(url) {
        window.open(url)
    }

    //styles 
    const personalProjectContainer = {
        display: 'flex',
        flexDirection: 'column',
        width: '45%'
    }
    // TODO Come back and make it so students can upload images
    const personalProjectPicture = {
        width: '100%',
        height: '150px',
        background: `url(${placeholder}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top'

    }
    const personalProjectInformation = {
        width: '100%',
        height: '50%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '10px'
    }

    return (
        <div style={personalProjectContainer}> 
            <div style={personalProjectPicture} className="project-url-link" onClick={() => openWindow(url)}></div>  
            <div style={personalProjectInformation}>
                <div>Project name: {projectName}</div>
                <div>Student: {studentFirst} {studentLast}</div>
                <div>Url: {url}</div>
            </div>
        </div>
    )
}