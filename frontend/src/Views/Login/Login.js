import React, {Component} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

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
        let body = {username, password}
        let {login} = this.props 
        login(body)
        // axios.post('/api/login', data).then(response => {
        //         this.setState({
        //             redirect: true
        //         })
        // }).catch(err => {
        //     toast.error('No user found')
        //     this.setState({
        //         username: '',
        //         password: ''
        //     })
        // })
    }

    componentDidMount() {
        axios.get('/api/loginCheck').then(response => {
            if(response.data.loggedIn) this.setState({redirect: true, initialAuth: true})
            else this.setState({initialAuth: true})
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.errorLoggingIn) {
            this.setState({
                username: '',
                password: ''
            }, () => {
                toast.error('No user found')
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

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn,
        errorLoggingIn: state.errorLoggingIn
    }
}

export default connect(mapStateToProps, {login})(Login)