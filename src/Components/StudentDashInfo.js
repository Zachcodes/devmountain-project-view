import React, {Component} from 'react'

export default class StudentDashInfo extends Component {
    constructor(props) {
        super(props)
        let {about, first, last, email, linkedin, portfolio, github, image} = props.studentInfo 
        this.state = {
            about,
            first,
            last,
            email,
            linkedin,
            portfolio,
            github,
            image,
            edit: false
        }
    }

    handleChange(val, key) {
        let obj = {}
        obj[key] = val 
        this.setState(obj)
    }

    render() {
        let { about, first, last, email, linkedin, portfolio, github, image, edit } = this.state
        return (
            <div>
                {
                    edit 
                    ?
                    <div className="student-dash-info-container">
                        <input value={image} onChange={(e) => this.handleChange(e.target.value, 'image')}/>
                        <input value={first} onChange={(e) => this.handleChange(e.target.value, 'first')}/>
                        <input value={last} onChange={(e) => this.handleChange(e.target.value, 'last')}/>
                        <input value={about} onChange={(e) => this.handleChange(e.target.value, 'about')}/>
                        <input value={email} onChange={(e) => this.handleChange(e.target.value, 'email')}/>
                        <input value={linkedin} onChange={(e) => this.handleChange(e.target.value, 'linkedin')}/>
                        <input value={portfolio} onChange={(e) => this.handleChange(e.target.value, 'portfolio')}/>
                        <input value={github} onChange={(e) => this.handleChange(e.target.value, 'github')}/>
                    </div>
                    :
                    <div className="student-dash-info-container">
                        <img src={image} className="student-dashboard-info-picture"/>
                        <span className="student-dashboard-info-text">{first} {last}</span>
                        <span className="student-dashboard-info-text">{about}</span>
                        <span className="student-dashboard-info-text">{email}</span>
                        <span className="student-dashboard-info-text">{linkedin}</span>
                        <span className="student-dashboard-info-text">{github}</span>
                        <span className="student-dashboard-info-text">{github}</span>
                    </div>
                }
            </div>
        )
    }
}