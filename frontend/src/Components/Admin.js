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
            let {userRatedProjects, unratedProjects} = response.data
            this.setState({
                ratedProjects: userRatedProjects,
                unratedProjects: unratedProjects
            })
        })
    }

    updateProjects = (projectsArr) => {
        let {userRatedProjects, unratedProjects} = projectsArr
        this.setState({
            ratedProjects: userRatedProjects,
            unratedProjects: unratedProjects
        })
    }
    render() {
        let {ratedProjects, unratedProjects} = this.state
        return (
            <div>
               {
                   ratedProjects.map((project, index) => {
                        return (
                            <RatedProject project={project} key={project.project_name}/>
                        )
                   })
               }
               {
                   unratedProjects.map((project, index) => {
                        return (
                            <UnratedProject 
                            project={project} 
                            key={project.project_name}
                            updateProjects={this.updateProjects}/>
                        )
                   })
               } 
            </div>
        )
    }
}