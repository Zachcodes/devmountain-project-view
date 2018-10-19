import React from 'react'
import { Link } from 'react-router-dom'

export default function Cohort(props) {
    let {name, id: cohortid, type} = props;
    return (
        <Link to={`/programs/cohorts/${type}/${cohortid}?name=${name}`} className="program-landing-cohort">
            <div>
                    <p>{name}</p>
            </div>
        </Link>
    )
}