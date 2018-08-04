import React, {Component} from 'react'
import axios from 'axios'

export default class Student extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        axios.get('/api/loadDashboard/admin').then(response => {
            console.log(response)
        })
    }
    render() {
        return (
            <div>
                Student!
            </div>
        )
    }
}