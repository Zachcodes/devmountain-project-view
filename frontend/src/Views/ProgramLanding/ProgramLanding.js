import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './ProgramLanding.css'

import {connect} from 'react-redux'

class ProgramLanding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grabbedData: false,
            doneLoading: props.programs.length ? true : false,
            active: 'all'
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.programs.length !== prevProps.programs.length && !this.state.doneLoading) {
            this.setState({
                doneLoading: true
            })
        }
    }

    setActiveProgram = (type) => {
        this.setState({
            active: type
        })
    }

    render() {
        let {doneLoading, active} = this.state
        let {programs} = this.props
        return (
            doneLoading 
            ?
            <div>
                <div>
                    <span 
                        onClick={e => this.setActiveProgram('all')}
                        className={active === 'all' ? 'program-heading active' : 'program-heading'}>All</span> / 
                    <span 
                        onClick={e => this.setActiveProgram('web')}
                        className={active === 'web' ? 'program-heading active' : 'program-heading'}>Web Dev</span> / 
                    <span 
                        onClick={e => this.setActiveProgram('ios')}
                        className={active === 'ios' ? 'program-heading active' : 'program-heading'}>IOS Dev</span> / 
                    <span 
                        onClick={e => this.setActiveProgram('ux')}
                        className={active === 'ux' ? 'program-heading active' : 'program-heading'}>UX</span>
                </div>
                <div>

                </div>
                {/* <div className="program-right-title">
                    Programs
                </div>
                <div className="program-right-body">
                    {programs.map(program => {
                    return (
                        <div className="program-right-styled-program" key={program.id}>
                            <Link to={`programs/cohorts/${program.id}`} className="program-right-link">
                                <button className="program-right-button">{program.type}</button>
                            </Link>
                        </div>
                        )
                    })}
                </div> */}
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