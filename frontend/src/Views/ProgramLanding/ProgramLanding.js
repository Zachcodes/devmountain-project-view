import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ProgramLanding.css'

import {connect} from 'react-redux'

class ProgramLanding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grabbedData: false,
            doneLoading: props.programs.length ? true : false
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.programs.length !== prevProps.programs.length && !this.state.doneLoading) {
            this.setState({
                doneLoading: true
            })
        }
    }

    render() {
        let {doneLoading} = this.state
        let {programs} = this.props
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

function mapStateToProps(state) {
    let {programs} = state;
    return {
        programs
    }
}

export default connect(mapStateToProps)(ProgramLanding)