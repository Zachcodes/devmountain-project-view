import React from 'react'
import { Link } from 'react-router-dom'

export default function Cohort(props) {
    // console.log(props)
    let {name, id: cohortid, type, studentCount} = props;
    let cohortClass = 'program-landing-cohort'
    if(+studentCount < 1) cohortClass = 'program-landing-cohort no-students'
    // TODO: Come back to this later and make it so you cant click if there are no students
    return (
        <Link to={`/programs/cohorts/${type}/${cohortid}?name=${name}`} className={cohortClass}>
            <h4>{name}</h4>
            <h5>{type}</h5>
        </Link>
    )
}