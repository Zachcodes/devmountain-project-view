import React, {Component} from 'react'
import axios from 'axios'


export default class NewUser extends Component {
    constructor() {
        super()
        this.state = {
            student: {
                about: '',
                email: '',
                first: '',
                github: '',
                image: '',
                last: '',
                linkedin: '',
                portfolio: ''
            },
            cohorts: [],
            cohortTypes: [],
            selectedType: 'none',
            selectedCohortId: 0
        }
    }

    componentDidMount() {
        axios.get('/api/students/info').then(res => {
            let {
                student,
                cohorts,
                cohortTypes
            } = res.data
            let obj = this.setSelectedCohortAndType(student.cohort, cohorts)
            let {
                selectedType,
                selectedCohortId
            } = obj
            this.setState({
                student,
                cohorts,
                cohortTypes,
                selectedType,
                selectedCohortId
            })
        })
    }

    setSelectedCohortAndType(studentCohort, cohorts) {
        let selectedCohort, selectedCohortId = 0,
            selectedType = 'none';
        if (studentCohort) {
            selectedCohort = cohorts.find(c => c.id === studentCohort)
            selectedCohortId = selectedCohort.id
            selectedType = selectedCohort.type
        }

        return {
            selectedCohortId,
            selectedType
        }
    }

    handleChange(val, key) {
        let obj = {}
        obj[key] = val;
        this.setState(obj)
    }

    handleStudentChange(val, key) {
        let obj = { ...this.state.student}
        obj[key] = val;
        this.setState({
            student: obj
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }
    render() {
            let {
                about,
                email,
                first,
                github,
                image,
                last,
                linkedin,
                portfolio
            } = this.state.student
            let {
                cohortTypes,
                selectedType,
                selectedCohortId,
                cohorts
            } = this.state

            return ( 
                <div>
                    <form onSubmit = {this.handleSubmit}>
                    <div> About: <input value={about} onChange={(e) => this.handleStudentChange(e.target.value, 'about')}/></div >
                    <div>
                    Cohort Type:
                    <select name="cohortTypes" value={selectedType} onChange={(e) => this.handleChange(e.target.value, 'selectedType')}>
                    <option value={'none'}>None</option> 
                    {
                    cohortTypes.map(t => {
                        return <option value={
                            t
                        }
                        key = {
                            t
                        } > {
                            t
                        } </option>
                    })
                }
                </select>
            Cohort:
                <select name="cohorts" value={selectedCohortId} onChange={(e) => this.handleChange(e.target.value, 'selectedCohortId')}>
                <option value='none'>None</option>
                {
                    cohorts.map(c => {
                    return <option value={c.id} key={c.id}> { c.name }</option>
                    })
                } 
        </select> </div><div> Email: <input value={email} onChange = {(e) => this.handleStudentChange(e.target.value, 'email')}/></div>
            <div> First: <input value={first} onChange={(e) => this.handleStudentChange(e.target.value, 'first')}/></div>
            <div> Github: <input value={github} onChange={(e) => this.handleStudentChange(e.target.value, 'github')}/></div>
            <div> Image: <input value={image} onChange={(e) => this.handleStudentChange(e.target.value, 'image')}/></div>
            <div> Last: <input value={last} onChange={(e) => this.handleStudentChange(e.target.value, 'last')}/></div>
            <div> LinkedIn: <input value={linkedin} onChange={(e) => this.handleStudentChange(e.target.value, 'linkedin')}/></div>
            <div> Portfolio: <input value={portfolio} onChange={(e) => this.handleStudentChange(e.target.value, 'portfolio')}/></div>
            <button type="submit" onSubmit={this.handleSubmit}> Save Changes </button>  
            </form>  
        </div>
    )}
}