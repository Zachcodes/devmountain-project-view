import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

//components
import Cohort from '../../Components/Cohort';

class CohortOverview extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            cohorts: [],
            grabbedData: false
        }
    }
    
    componentDidMount() {
        if(this.props.match.params.programtype) {
            this.refreshCohorts()
        } 
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.programtype !== this.props.match.params.programtype) {
            this.refreshCohorts()
        }
    }

    refreshCohorts = () => {
        let programtype = this.props.match.params.programtype;
        axios.get(`/api/programs/${programtype}`).then(response => {
            this.setState({
                grabbedData: true,
                cohorts: response.data
            })
        }).catch(err => {
            this.setState({
                grabbedData: true
            }, () => {
                alert('Failed to grab cohorts');
            })
        }) 
    }

    render() {
        return (
            <div>
                {
                    this.state.cohorts.map((cohort, index) => <Cohort type={this.props.match.params.programtype} name={cohort.name} id={cohort.id} key={index}/>)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        programs: state.programs
    }
}

export default connect(mapStateToProps)(CohortOverview)