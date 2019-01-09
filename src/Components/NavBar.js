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

    hideDropdown = () => {
        this.dropDownRef.current.classList.remove('navbar-dropdown-show')
    }

    logout = () => {
        let {logout} = this.props
        logout().then(res => {
            let {action} = res;
            if(action.type === 'LOGOUT_FULFILLED') {
                let {location, history} = this.props
                if(location.pathname === '/dashboard') history.push('/')
            }
        })
    }

    render() {
        let {programs, loggedIn} = this.props
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
                            {/* <div className="navbar-right-link programs" onMouseLeave={this.checkDropdownStatus}><Link to="/programs" onMouseEnter={this.setClassDropdown}>Programs</Link></div> */}
                            <div className="navbar-right-link programs"><Link to="/programs">Programs</Link></div>
                            <div className="navbar-right-link dashboard"><Link to="/dashboard">Dashboard</Link></div>
                            <div className="navbar-right-link navbar-right-logout" onClick={this.logout}>Logout</div>
                            <i className="fas fa-bars hamburger-nav" onMouseEnter={this.setClassDropdown} onMouseLeave={this.checkDropdownStatus}></i>
                        </span>
                        :
                        <span className="navbar-right-span">
                            {/* <div className="navbar-right-link programs" onMouseLeave={this.checkDropdownStatus}><Link to="/programs" onMouseEnter={this.setClassDropdown}>Programs</Link></div> */}
                            <div className="navbar-right-link programs"><Link to="/programs">Programs</Link></div>
                            <div className="navbar-right-link login"><a href="/api/auth">Login</a></div>
                            <i className="fas fa-bars hamburger-nav" onMouseEnter={this.setClassDropdown} onMouseLeave={this.checkDropdownStatus}></i>
                        </span>
                    }
                </div>
                <div className="navbar-dropdown navbar-dropdown-hidden" ref={this.dropDownRef} onMouseLeave={this.checkDropdownStatus}>
                    {
                        programs.map(program => {
                            return (
                                <span className="navbar-dropdown-link" key={program.id} onClick={this.hideDropdown}>
                                    <Link to={`/programs/cohorts/${program.id}`}
                                    replace={true}>
                                        {program.type}
                                    </Link>
                                </span>
                            )
                            })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {getPrograms, checkLogin, logout})(NavBar)