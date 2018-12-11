import React from 'react'

export default function StudentContainer(props) {
    let {first, last, about, image} = props.student

    const studentPicture = {
        width: '100%',
        height: '200px',
        background: `url(${image}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top'

    }
    const studentContainer = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflow: 'auto'
    }
    const studentTitle = {
        width: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5px'
    }
    const studentAbout = {
        height: '90%',
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '10px',
        marginTop: '5px'
    }

    return (
        <div style={studentContainer}>
            <div style={studentTitle}>{first} {last}</div>
            <div style={studentPicture}></div>
            <div style={studentAbout}>{about}</div>
        </div>
    )
}