import React from 'react'
import { Link } from 'react-router-dom'

export default function Cohort(props) {
    let {name, id: cohortid, type} = props;
    return (
        <div>
            <p>{name}</p>
            <p>{cohortid}</p>
            <Link to={`/programs/cohorts/${type}/${cohortid}`}><button>Cohort Details</button></Link>
        </div>
    )
}