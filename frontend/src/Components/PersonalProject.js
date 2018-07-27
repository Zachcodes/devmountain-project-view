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
        height: '300px'
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
        flexDirection: 'column'
    }
    console.log(props)
    let {project_name: projectName, first, last, url} = props.projectDetails
    return (
        <div style={personalProjectContainer}> 
            <div style={personalProjectPicture}></div>  
            <div style={personalProjectInformation}>
                <div>Project name: {projectName}</div>
                <div>Student: {projectDetails.first} {projectDetails.last}</div>
                <div>Url: {url}</div>
            </div>
        </div>
    )
}