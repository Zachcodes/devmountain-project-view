import React, {Component} from 'react'
import axios from 'axios'

export default class NewUser extends Component {
    constructor() {
        super()
        this.state = {
            student: {}
        }
    }

    componentDidMount() {
        axios.get('/api/students/info').then( res => {
            let student = res.data 
            this.setState({student})
        })
    }

    handleChange(val, key) {
        let obj = {...this.state.student}
        obj[key] = val;
        console.log('this', this)
        console.log('obj', obj)
        console.log('test')
        this.setState({student: obj})
    }

    render() {
        let {about, cohort, email, first, github, image, last, linkedin, portfolio} = this.state.student

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>About: <input value={about} onChange={(e) => this.handleChange(e.target.value, 'about')}/></div>
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