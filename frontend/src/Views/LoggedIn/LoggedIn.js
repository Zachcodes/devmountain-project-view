import React, {Component} from 'react'
import axios from 'axios'
import './LoggedIn.css'

//components 
import Student from '../../Components/Student'
import Staff from '../../Components/Staff'
import Admin from '../../Components/Admin'

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

    redirectToLogin = () => {
        window.location = 'http://localhost:3200/api/auth'
    }
    
    render() {
        let {role, initialAuth, redirect} = this.state
        let {redirectToLogin} = this
        let typeToRender = ''
        if(role === 'student') typeToRender = <Student />
        if(role === 'staff') typeToRender = <Staff />
        if(role === 'admin') typeToRender = <Admin />
        if(initialAuth && redirect) redirectToLogin()
        return (
            initialAuth
            ?
            redirect
            ?
            null
            :
            <div>
                {typeToRender}
            </div>
            :
            null
        )
    }
}