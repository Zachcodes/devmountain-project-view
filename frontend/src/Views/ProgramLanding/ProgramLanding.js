import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ProgramLanding.css'

export default class ProgramLanding extends Component {
    constructor() {
        super()
        this.state = {
            programs: [],
            grabbedData: false,
            doneLoading: false
        }
    }

    componentDidMount() {
        axios.get('/api/programs').then(programs => {
            this.setState({
                programs: programs.data.types,
                doneLoading: true
            })
        }).catch(err => {
            if(err) {
                alert('Could not get programs')
            }
        })
    }

    render() {
        let {doneLoading, programs} = this.state
        return (
            doneLoading 
            ?
            <div>
                <div className="program-right-title">
                    Programs
                </div>
                <div className="program-right-body">
                    {programs.map(program => {
                    return (
                        <div className="program-right-styled-program">
                            <Link to={`programs/cohorts/${program.id}`} key={program.id} className="program-right-link">
                                <button className="program-right-button">{program.type}</button>
                            </Link>
                        </div>
                        )
                    })}
                </div>
            </div>
            :
            <div>
                Loading!
            </div>
        )
    }
}