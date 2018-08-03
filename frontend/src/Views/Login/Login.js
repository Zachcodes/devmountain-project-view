import React, {Component} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirect: false,
            initialAuth: false
        }
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val;
        this.setState(obj)
    }

    login = () => {
        let {username, password} = this.state
        let data = {username, password}
        axios.post('/api/login', data).then(response => {
                this.setState({
                    redirect: true
                })
        }).catch(err => {
            toast.error('No user found')
            this.setState({
                username: '',
                password: ''
            })
        })
    }

    componentDidMount() {
        axios.get('/api/loginCheck').then(response => {
            if(response.data.loggedIn) this.setState({redirect: true, initialAuth: true})
            else this.setState({initialAuth: true})
        })
    }

    render() {
        let {redirect, initialAuth} = this.state
        return (
            initialAuth
            ?
            redirect 
            ?
            <Redirect to="/dashboard"/>
            :
            <div>
                Username: <input value={this.state.username} onChange={(e) => this.handleChange(e.target.value, 'username')}/>
                Password: <input value={this.state.password} onChange={(e) => this.handleChange(e.target.value, 'password')}/>
                <button onClick={this.login}>Login</button>
                <ToastContainer/>
            </div>
            :
            null
        )
    }
}