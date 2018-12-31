import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './ProgramLanding.css'
import axios from 'axios';
import Cohort from '../../Components/Cohort';

import {connect} from 'react-redux'

class ProgramLanding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grabbedData: false,
            doneLoading: props.programs.length ? true : false,
            active: 0,
            cohorts: [],
            amountToDisplay: 20
        }
    }

    componentDidMount() {
        this.refreshCohorts()
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
        }, () => {
            this.refreshCohorts()
        })
    }


    refreshCohorts = () => {
        let { active } = this.state;
        axios.get(`/api/programs/${active}`).then(response => {
            this.setState({
                grabbedData: true,
                cohorts: response.data,
                amountToDisplay: response.data.length
            })
        }).catch(err => {
            this.setState({
                grabbedData: true
            }, () => {
                alert('Failed to grab cohorts');
            })
        }) 
    }

    setAmountToDisplay = (type) => {
        let {amountToDisplay} = this.state
        let newAmount;
        switch(type) {
            case 'more':
                newAmount = amountToDisplay + 20;
                break;
            case 'less':
                newAmount = 20;
                break;
        }
        this.setState({amountToDisplay: newAmount})
    }

    render() {
        let {doneLoading, active, cohorts, amountToDisplay} = this.state
        let filtered = cohorts.filter( cohort => {
            if(active === 0 && cohort.name) {
                return true;
            } else if(cohort.cohort_type === active && cohort.name) {
                return true
            }
        }).map( (cohort, index) => {
            return (
                <Cohort type={cohort.type} name={cohort.name} id={cohort.id} key={index} studentCount={cohort.count}/>
            )
        })
        let showMore = false;
        if(filtered.length > amountToDisplay) {
            filtered = filtered.slice(0, amountToDisplay)
            showMore = true;
        }

        return (
            <div className="program-landing-main-container">
                <div className="program-landing-title-container">
                    <span 
                        onClick={e => this.setActiveProgram(0)}
                        className={active === 0 ? 'program-heading active' : 'program-heading'}>All</span> / 
                    <span 
                        onClick={e => this.setActiveProgram(1)}
                        className={active === 1 ? 'program-heading active' : 'program-heading'}>Web Dev</span> / 
                    <span 
                        onClick={e => this.setActiveProgram(3)}
                        className={active === 3 ? 'program-heading active' : 'program-heading'}>IOS Dev</span> / 
                    <span 
                        onClick={e => this.setActiveProgram(2)}
                        className={active === 2 ? 'program-heading active' : 'program-heading'}>UX</span>
                </div>
                {/* <div className="program-landing-cohorts-outer-container"> */}
                <div className="program-landing-cohorts-inner-container">
                    {
                        filtered
                    }
                </div>
                {/* </div> */}
                {/* {
                    showMore 
                    ?
                    <button className="program-show-button" onClick={() => this.setAmountToDisplay('more')}>Show More</button>
                    :
                    <button className="program-show-button" onClick={() => this.setAmountToDisplay('less')}>Show Less</button>
                } */}
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