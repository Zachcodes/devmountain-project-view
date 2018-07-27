import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Program.css'

export default class Home extends Component {
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
                    programs: programs.data,
                    doneLoading: true
                })
            }).catch(err => {
                if(err) {
                    alert('Could no get programs')
                }
            })
    }
    render() {
        let {doneLoading, programs} = this.state
        return (
            doneLoading
            ?
            <div className="program-container">
                <div className="program-left-container">
                    <span>
                        Welcome to DevMountain's Project Browser! This project was inspired by all the excellent projects that DevMountain students have produced. These projects are seen by their mentors, instructors and fellow classmates but not many students going forward will see them. There's a lot of creativity that has gone into these projects and hopefully they can help inspire you and showcase all the hard work that has made them possible! 
                    </span>
                </div>
                <div className="program-right-container">
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
            </div>
            :
            <div>
                Loading!
            </div>
        )
    }
}