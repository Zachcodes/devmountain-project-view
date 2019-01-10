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
            console.log(res)
            let student = res.data 
            this.setState({student})
        })
    }

    render() {
        let {student} = this.state
        console.log('stduent', student)
        return (
            <div>
                New User!
            </div>
        )
    }
}