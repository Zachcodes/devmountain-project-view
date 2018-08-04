import React, {Component} from 'react'
import axios from 'axios'

//components 
import UnratedProject from './UnratedProject'
import RatedProject from './RatedProject'

export default class Admin extends Component {
    constructor() {
        super()
        this.state = {
            ratedProjects: [],
            unratedProjects: []
        }
    }
    componentDidMount() {
        axios.get('/api/loadDashboard/admin').then(response => {
            console.log(response.data)
            let {userRatedProjects, unratedProjects} = response.data
            this.setState({
                ratedProjects: userRatedProjects,
                unratedProjects: unratedProjects
            })
        })
    }
    render() {
        let {ratedProjects, unratedProjects} = this.state
        return (
            <div>
               {
                   ratedProjects.map((project, index) => {
                        return (
                            <RatedProject project={project} key={index}/>
                        )
                   })
               }
               {
                   unratedProjects.map((project, index) => {
                        return (
                            <UnratedProject project={project} key={index}/>
                        )
                   })
               } 
            </div>
        )
    }
}