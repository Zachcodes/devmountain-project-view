import React from 'react'
import '../css/main.css'
import {Link} from 'react-router-dom'

export default function GroupProject(props) {
    let {projectDetails, members} = props
    let {projectName, url} = projectDetails[0];
    function openWindow(url) {
        window.open(url)
    }
    console.log(members)
    return (
        <div className="personal-project-container">   
            <div>Project name: {projectName}</div>
            <div>Group Members: {
                members.map((member, index) => {
                    if(index == members.length -1) return <Link to={`/students/${member.id}`}>{member.first} {member.last}</Link>
                    else return <Link to={`/students/${member.id}`}>{member.first} {member.last}, </Link>
                })
            }</div>
            <div>Url: {url}</div>
            <button onClick={() => openWindow(url)}>View Project!</button>
        </div>
    )
}