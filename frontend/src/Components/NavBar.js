import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import '../css/main.css'
import logo from '../images/devmountain.png'

export default class NavBar extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.dropDownRef = React.createRef()
    }

    setClassDropdown = () => {
        if(!this.dropDownRef.current.classList.contains('navbar-dropdown-show')) {
            this.dropDownRef.current.classList.add('navbar-dropdown-show')
        }
        // this.dropDownRef.current.classList.remove('navbar-dropdown-show')
        
    }

    checkDropdownStatus = (e) => {
        let x = e.clientX, y = e.clientY 
        let elementMouseIsOver = document.elementFromPoint(x, y)
        if(elementMouseIsOver) {
            if(!elementMouseIsOver.classList.contains('navbar-dropdown-show') && !elementMouseIsOver.classList.contains('programs')) {
                this.dropDownRef.current.classList.remove('navbar-dropdown-show')
            }
        }
    }
    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to='/'><img src={logo} className="devmountain-logo" /></Link>
                    <Link to='/'><span>DevMountain Project Browser</span></Link>
                </div>
                <div className="navbar-right">
                    <div className="navbar-right-link programs" onMouseLeave={this.checkDropdownStatus}><Link to="/programs" onMouseEnter={this.setClassDropdown}>Programs</Link></div>
                    <div className="navbar-right-link login"><Link to="/login">Login</Link></div>
                    <div className="navbar-dropdown navbar-dropdown-hidden" ref={this.dropDownRef} onMouseLeave={this.checkDropdownStatus}>
        
                    </div>
                </div>
            </div>
        )
    }
}