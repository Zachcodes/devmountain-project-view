import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class LoggedIn extends Component {
    constructor() {
        super()
        this.state = {
            role: '',
            initialAuth: false,
            redirect: false
        }
    }
    componentDidMount() {
        axios.get('/api/loadDashboard').then(response => {
            this.setState({initialAuth: true, role: response.data.role})
        }).catch(err => this.setState({initialAuth: true, redirect: true}))
    }
    render() {
        let {role, initialAuth, redirect} = this.state
        return (
            initialAuth
            ?
            redirect
            ?
            <Redirect to="/login" />
            :
            <div>
                {this.state.role}
            </div>
            :
            null
        )
    }
}