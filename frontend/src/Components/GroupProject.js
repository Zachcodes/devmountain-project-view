import React from 'react'
import {Link} from 'react-router-dom'
import placeholder from '../images/thumbnail_placeholder.png'
import '../css/main.css'


export default function GroupProject(props) {
    let {projectName, members, url} = props
    function openWindow(url) {
        window.open(url)
    }

    //styles 
    const personalProjectContainer = {
        display: 'flex',
        flexDirection: 'column',
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

    return (
        <div style={personalProjectContainer}> 
            <div style={personalProjectPicture} className="project-url-link" onClick={() => openWindow(url)}></div>
            <div style={personalProjectInformation}>
                <div>Project name: {projectName}</div>
                <div>Group Members: {
                    members.map((member, index) => {
                        if(index == members.length -1) {
                            return (
                                <Link to={`/students/${member.id}`}
                                key={member.studentId}>
                                    {member.studentName}
                                </Link>
                            )
                        }
                        else {
                            return (
                                <Link to={`/students/${member.id}`}
                                key={member.studentId}>
                                {member.studentName}, </Link>
                            )
                        }
                    })
                }</div>
                <div>Url: {url}</div>
            </div>
        </div>
    )
}