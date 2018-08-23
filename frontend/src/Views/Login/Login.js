import React, {Component} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './Login.css'

//redux 
import {login} from '../../Redux/actionCreators'

class Login extends Component {
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
        if(!username || !password) return alert('You must supply both a username and password')
        let body = {username, password}
        let {login} = this.props 
        login(body)
    }

    componentDidMount() {
        axios.get('/api/loginCheck').then(response => {
            if(response.data.loggedIn) this.setState({redirect: true, initialAuth: true})
            else this.setState({initialAuth: true})
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.errorLoggingIn != prevProps.errorLoggingIn) {
            this.setState({
                username: '',
                password: ''
            }, () => {
                toast.error('No user found')
            })
        } 
        else if (this.props.loggedIn != prevProps.loggedIn) {
            this.setState({
                redirect: true
            })
        }
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
            <div className="login-main-container">
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

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn,
        errorLoggingIn: state.errorLoggingIn
    }
}

export default connect(mapStateToProps, {login})(Login)