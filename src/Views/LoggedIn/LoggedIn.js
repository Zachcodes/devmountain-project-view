import React, {Component} from 'react'
import axios from 'axios'
import './LoggedIn.css'

//components 
import StudentDash from '../StudentDash/StudentDash'
import Staff from '../../Components/Staff'
import Admin from '../../Components/Admin'
import NewUser from '../NewUser/NewUser'

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
            let {role, newUser} = response.data
            this.setState({initialAuth: true, role, newUser})
        }).catch(err => this.setState({initialAuth: true, redirect: true}))
    }

    redirectToLogin = () => {
        window.location = 'http://localhost:3200/api/auth'
    }
    
    render() {
        let {role, initialAuth, redirect, newUser} = this.state
        let {redirectToLogin} = this
        let typeToRender = ''
        role = 'student'
        if(initialAuth && newUser && role === 'student') typeToRender = <NewUser {...this.props}/>
        // else if(initialAuth) {
        //     console.log(111)
        //     if(role === 'student') typeToRender = <StudentDash {...this.props}/>
        //     if(role === 'staff') typeToRender = <Staff {...this.props}/>
        //     if(role === 'admin') typeToRender = <Admin {...this.props}/>
        // }
        // TODO: Remove this after development
        if(initialAuth) redirect = false;
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