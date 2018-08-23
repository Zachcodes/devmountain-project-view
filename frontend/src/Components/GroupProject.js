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
    const groupProjectContainer = {
        display: 'flex',
        flexDirection: 'column',
        width: '45%'
    }
    // TODO Come back and make it so students can upload images
    const groupProjectPicture = {
        width: '100%',
        height: '150px',
        background: `url(${placeholder}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top'

    }
    const groupProjectInformation = {
        width: '100%',
        height: '50%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '10px'
    }

    return (
        <div style={groupProjectContainer}> 
            <div style={groupProjectPicture} className="project-url-link" onClick={() => openWindow(url)}></div>
            <div style={groupProjectInformation}>
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