import React from 'react'
import { Link } from 'react-router-dom'

export default function Cohort(props) {
    let {cohort, type, studentCount} = props;
    let {end_date, id, name, start_date} = cohort
    let cohortClass = 'program-landing-cohort'
    if(+studentCount < 1) cohortClass = 'program-landing-cohort no-students'
    return (
        +studentCount < 1 
        ?
        <div to={`/programs/cohorts/${type}/${id}?name=${name}`} className={cohortClass}>
            <h4>Cohort Name: {name}</h4>
            <h5>Type: {type}</h5>
            <h5>Start Date: {start_date}</h5>
            <h5>End Date: {end_date}</h5>
        </div>
        :
        <Link to={`/programs/cohorts/${type}/${id}?name=${name}`} className={cohortClass}>
            <h4>Cohort Name: {name}</h4>
            <h5>Type: {type}</h5>
            <h5>Start Date: {start_date}</h5>
            <h5>End Date: {end_date}</h5>
        </Link>
    )
}