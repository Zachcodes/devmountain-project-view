import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import '../css/main.css'
import logo from '../images/devmountain.png'

export default class NavBar extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to='/'><img src={logo} className="devmountain-logo" /></Link>
                    <Link to='/'><span>DevMountain Project Browser</span></Link>
                </div>
            </div>
        )
    }
}