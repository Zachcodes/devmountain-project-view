import React from 'react'
import placeholder from '../images/thumbnail_placeholder.png'


export default function PersonalProject(props) {
    let {projectDetails} = props
    function openWindow(url) {
        window.open(url)
    }

    //styles 
    const personalProjectContainer = {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        height: '150px',
        width: '45%'
    }
    // TODO Come back and make it so students can upload images
    const personalProjectPicture = {
        width: '100%',
        height: '50%',
        background: `url(${placeholder}) no-repeat`,
        backgroundSize: 'contain',
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

    let {project_name: projectName, first, last, url} = props.projectDetails
    return (
        <div style={personalProjectContainer}> 
            <div style={personalProjectPicture} class="project-url-link" onClick={() => openWindow(url)}></div>  
            <div style={personalProjectInformation}>
                <div>Project name: {projectName}</div>
                <div>Student: {first} {last}</div>
                <div>Url: {url}</div>
            </div>
        </div>
    )
}