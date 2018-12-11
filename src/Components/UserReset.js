import React, {Component} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'

export default class UserReset extends Component {
    constructor() {
        super()
        this.state = {
            newPassword: ''
        }
    }
    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val;
        this.setState(obj)
    }
    resetPassword = () => {
        let {newPassword} = this.state;
        let {userloginid: userLoginId} = this.props.user;
        axios.post(`/api/login/reset/${userLoginId}`, {newPassword}).then( res => {
            this.setState({
                newPassword: ''
            }, () => {
                toast.success('Successfully reset password')
            })
        })
    }
    render() {
        let {username, name} = this.props.user;
        let {newPassword} = this.state;
        return (
            <div>
                Name: {name}
                Username: {username}
                New password: <input value={newPassword} onChange={(e) => this.handleChange(e.target.value, 'newPassword')}/>
                <button onClick={this.resetPassword}>Reset</button>
                <ToastContainer/>
            </div>
        )
    }
}