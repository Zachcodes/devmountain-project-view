import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


import '../css/main.css'
import logo from '../images/devmountain.png'

//redux stuff 
import {getPrograms, checkLogin, logout} from '../Redux/actionCreators'

class NavBar extends Component {
    constructor() {
        super()
        this.dropDownRef = React.createRef()
    }

    componentDidMount() {
        let {getPrograms, programs, loggedIn, checkLogin} = this.props 
        if(!programs.length) getPrograms()
        if(!loggedIn) checkLogin()
    }

    setClassDropdown = () => {
        if(!this.dropDownRef.current.classList.contains('navbar-dropdown-show')) {
            this.dropDownRef.current.classList.add('navbar-dropdown-show')
        }
    }

    checkDropdownStatus = (e) => {
        let x = e.clientX, y = e.clientY 
        let elementMouseIsOver = document.elementFromPoint(x, y)
        if(elementMouseIsOver) {
            if(!elementMouseIsOver.classList.contains('navbar-dropdown-show') &&                     
               !elementMouseIsOver.classList.contains('programs') && 
               !elementMouseIsOver.classList.contains('navbar-dropdown-link')
              ) {
                this.dropDownRef.current.classList.remove('navbar-dropdown-show')
            }
        }
    }

    hideDropdown = (path) => {
        if(path) this.props.history.push(path)
        this.dropDownRef.current.classList.remove('navbar-dropdown-show')
    }

    logout = (hideDropdown = false) => {
        if(hideDropdown) this.dropDownRef.current.classList.remove('navbar-dropdown-show')
        let {logout} = this.props
        logout().then(res => {
            let {action} = res;
            if(action.type === 'LOGOUT_FULFILLED') {
                let {location, history} = this.props
                if(location.pathname === '/dashboard') history.push('/')
            }
        })
    }

    login = () => {
        if(process.env.REACT_APP_ENVIRONMENT === 'production') {
            window.location.href = '/api/auth';
        }
        else {
            window.location.href = 'http://localhost:3200/api/auth';
        }
    }

    render() {
        let {loggedIn} = this.props
        return (
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to='/'><img src={logo} alt="DevMountain Main Logo" className="devmountain-logo" /></Link>
                    <Link to='/'><span>DevMountain Project Browser</span></Link>
                </div>
                <div className="navbar-right">
                    {
                        loggedIn
                        ?
                        <span className="navbar-right-span">
                            <div className="navbar-right-link programs"><Link to="/programs">Programs</Link></div>
                            <div className="navbar-right-link dashboard"><Link to="/dashboard">Dashboard</Link></div>
                            <div className="navbar-right-link navbar-right-logout" onClick={this.logout}>Logout</div>
                            <i className="fas fa-bars hamburger-nav" onMouseEnter={this.setClassDropdown} onMouseLeave={this.checkDropdownStatus}></i>
                        </span>
                        :
                        <span className="navbar-right-span">
                            <div className="navbar-right-link programs"><Link to="/programs">Programs</Link></div>
                            <div className="navbar-right-link login" onClick={this.login}>Login</div>
                            <i className="fas fa-bars hamburger-nav" onMouseEnter={this.setClassDropdown} onMouseLeave={this.checkDropdownStatus}></i>
                        </span>
                    }
                </div>
                {
                    loggedIn
                    ?
                    <div className="navbar-dropdown navbar-dropdown-hidden" ref={this.dropDownRef} onMouseLeave={this.checkDropdownStatus}>
                        <span className="navbar-dropdown-link" onClick={() => this.hideDropdown('/programs')}>
                            Programs
                        </span>
                        <span className="navbar-dropdown-link" onClick={() => this.hideDropdown('/dashboard')}>
                            Dashboard
                        </span>        
                        <span className="navbar-dropdown-link" onClick={() => this.logout(true)}>
                            Logout
                        </span>        
                    </div>
                    :
                    <div className="navbar-dropdown navbar-dropdown-hidden" ref={this.dropDownRef} onMouseLeave={this.checkDropdownStatus}>
                        <span className="navbar-dropdown-link" onClick={() => this.hideDropdown('/programs')}>
                            Programs
                        </span>
                        <span className="navbar-dropdown-link" onClick={this.login}>
                            Login
                        </span>   
                    </div> 
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {getPrograms, checkLogin, logout})(NavBar)