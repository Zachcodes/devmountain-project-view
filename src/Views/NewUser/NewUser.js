import React, {Component} from 'react'
import axios from 'axios'


export default class NewUser extends Component {
    constructor() {
        super()
        this.state = {
            student: {},
            cohorts: {},
            types: [],
            selectedType: 'none',
            selectedCohortId: 0
        }
    }

    componentDidMount() {
        axios.get('/api/students/info').then( res => {
            let {student, cohorts} = res.data
            let types = Object.keys(cohorts)
            let o = this.setSelectedCohortAndType()
            let {selectedType, selectedCohortId} = o
            this.setState({student, cohorts, types, selectedType, selectedCohortId})
        })
    }

    setSelectedCohortAndType(studentCohort, cohorts) {
        let selectedCohort, selectedCohortId = 0, selectedType = 'none';
        if(studentCohort) {
            selectedCohort = cohorts.find( c => c.id === studentCohort)
            selectedCohortId = selectedCohort.id
            selectedType = selectedCohort.type
        }

        return {selectedCohortId, selectedType}
    }

    handleChange(val, key) {
        let obj = {...this.state.student}
        obj[key] = val;
        this.setState({student: obj})
    }

    render() {
        let {about, cohort, email, first, github, image, last, linkedin, portfolio} = this.state.student
        let {types, selectedType, selectedCohortId, cohorts} = this.state

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>About: <input value={about} onChange={(e) => this.handleChange(e.target.value, 'about')}/></div>
                    <div>
                    Cohort Type: 
                    <select name="types" value={selectedType}>
                        <option value={'none'}>None</option>
                        {
                            types.map( t => {
                                return <option value={t} key={t}>{t}</option>
                            })
                        }
                    </select>
                    Cohort:
                    <select name="cohorts" value={selectedCohortId}>
                        <option value='none'>None</option>
                        {
                            cohorts.map( c => {
                                return <option value={c.id} key={c.id}>{c.name}</option>
                            })
                        }
                    </select>
                    </div>
                    <div>Cohort: <input value={cohort} onChange={(e) => this.handleChange(e.target.value, 'cohort')}/></div>
                    <div>Email: <input value={email} onChange={(e) => this.handleChange(e.target.value, 'email')}/></div>
                    <div>First: <input value={first} onChange={(e) => this.handleChange(e.target.value, 'first')}/></div>
                    <div>Github: <input value={github} onChange={(e) => this.handleChange(e.target.value, 'github')}/></div>
                    <div>Image: <input value={image} onChange={(e) => this.handleChange(e.target.value, 'image')}/></div>
                    <div>Last: <input value={last} onChange={(e) => this.handleChange(e.target.value, 'last')}/></div>
                    <div>LinkedIn: <input value={linkedin} onChange={(e) => this.handleChange(e.target.value, 'linkedin')}/></div>
                    <div>Portfolio: <input value={portfolio} onChange={(e) => this.handleChange(e.target.value, 'portfolio')}/></div>
                    <button>Save Changes</button>
                </form>
            </div>
        )
    }
}
