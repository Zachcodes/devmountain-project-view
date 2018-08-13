import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


import '../css/main.css'
import logo from '../images/devmountain.png'

//redux stuff 
import {getPrograms} from '../Redux/actionCreators'
import {checkLogin} from '../Redux/actionCreators'

class NavBar extends Component {
    constructor() {
        super()
        this.state = {

        }
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
        let {programs, loggedIn} = this.props
        return (
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to='/'><img src={logo} className="devmountain-logo" /></Link>
                    <Link to='/'><span>DevMountain Project Browser</span></Link>
                </div>
                <div className="navbar-right">
                    <div className="navbar-right-link programs" onMouseLeave={this.checkDropdownStatus}><Link to="/programs" onMouseEnter={this.setClassDropdown}>Programs</Link></div>
                    {
                        loggedIn
                        ?
                        <div className="navbar-right-link dashboard"><Link to="/dashboard">Dashboard</Link></div>
                        :
                        <div className="navbar-right-link login"><Link to="/login">Login</Link></div>
                    }
                    <div className="navbar-dropdown navbar-dropdown-hidden" ref={this.dropDownRef} onMouseLeave={this.checkDropdownStatus}>
                        {
                            programs.map(program => <span>{program.type}</span>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps, {getPrograms, checkLogin})(NavBar)