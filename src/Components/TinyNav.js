import React from 'react'

export default function TinyNav(props) {
    let classList = props.heightClass ? `tiny-nav-container ${props.heightClass}` : 'tiny-nav-container' 
    return (
        <div className={classList}>
            Home / Programs / Cohorts / UX / Students
        </div>
    )
}