import React from 'react'
import {Link} from 'react-router-dom'
import placeholder from '../images/thumbnail_placeholder.png'


export default function GroupProject(props) {
    let {projectDetails, members} = props
    let {projectName, url} = projectDetails[0];
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

    return (
        <div style={personalProjectContainer}> 
            <div style={personalProjectPicture}></div>  
            <div style={personalProjectInformation}>
                <div>Project name: {projectName}</div>
                <div>Group Members: {
                    members.map((member, index) => {
                        if(index == members.length -1) return <Link to={`/students/${member.id}`}>{member.first} {member.last}</Link>
                        else return <Link to={`/students/${member.id}`}>{member.first} {member.last}, </Link>
                    })
                }</div>
                <div>Url: {url}</div>
            </div>
        </div>
    )
}