import React from 'react'

export default function StudentContainer(props) {
    let {first, last, about, image} = props.student

    const studentPicture = {
        width: '50%',
        height: '100%',
        background: `url(${image}) no-repeat`,
        backgroundSize: 'contain',
        backgroundPosition: 'center top'

    }
    const studentInformation = {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const studentContainer = {
        width: '100%',
        height: '200px',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        overflow: 'auto'
    }
    const studentTitle = {
        height: '10%',
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const studentAbout = {
        height: '90%',
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: '10%',
        fontSize: '10px'
    }

    return (
        <div style={studentContainer}>
            <div style={studentPicture}>

            </div>
            <div style={studentInformation}>
                <div style={studentTitle}>{first} {last}</div>
                <div style={studentAbout}>{about}</div>
            </div>
        </div>
    )
}