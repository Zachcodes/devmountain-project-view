import React, {Component} from 'react'
import axios from 'axios'

export default class Student extends Component {
    constructor() {
        super()
        this.state = {
            hasGroup: false,
            hasPersonal: false,
            group: [],
            personal: [],
            student: {},
            retrievedDashboard: false
        }
    }
    componentDidMount() {
        axios.get('/api/loadDashboard/student').then(response => {
            let {hasGroup, hasPersonal, group, personal, student} = response.data
            this.setState({
                hasGroup,
                hasPersonal,
                group,
                personal,
                student,
                retrievedDashboard: true
            })
        })
    }
    render() {
        let {retrievedDashboard, hasGroup, hasPersonal, group, personal, student} = this.state
        console.log(student)
        return (
            retrievedDashboard 
            ?
            <div className="student-dashboard-main">
                <div className="student-dashboard-left-container">
                    {student.first} {student.last}
                </div>
                <div className="student-dashboard-right-container">
                    {
                        hasPersonal 
                        ?
                        personal.map(project => {
                            console.log('personal', project)
                        })
                        :
                        <div>
                            Need to add a personal project
                        </div>
                    }
                    {
                        hasGroup 
                        ?
                        group.map(project => {
                            console.log('group', project)
                        })
                        :
                        <div>
                            Need to add a group project
                        </div>
                    }
                </div>
            </div>
            :
            <div className="student-dashboard-main">
                Loading Dashboard!
            </div>
        )
    }
}