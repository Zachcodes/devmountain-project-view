import React from 'react'

export default function RatedPersonal(props) {
    let {project, updateProjects} = props 
    let {project_name, rating, student_first, student_last} = project
    return (
        <div>
            Project name: {project_name}
            Project rating: {rating}
            Student name: {`${student_first} ${student_last}`}
        </div>
    )
}