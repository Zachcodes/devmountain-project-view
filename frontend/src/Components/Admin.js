import React, {Component} from 'react'
import axios from 'axios'

//components 
import RatedGroup from './RatedGroup'
import RatedPersonal from './RatedPersonal'
import UnratedGroup from './UnratedGroup'
import UnratedPersonal from './UnratedPersonal'

export default class Admin extends Component {
    constructor() {
        super()
        this.state = {
            ratedPersonal: [],
            ratedGroup: [],
            unratedPersonal: [],
            unratedGroup: []
        }
    }
    componentDidMount() {
        axios.get('/api/loadDashboard/admin').then(response => {
            this.updateProjects(response.data)
        })
    }

    updateProjects = (projectsArr) => {
        let {rated, unrated} = projectsArr
        let {group: groupUnrated, personal: personalUnrated} = unrated; 
        let {group: groupRated, personal: personalRated} = rated;
        this.setState({
            ratedPersonal: personalRated,
            ratedGroup: groupRated,
            unratedPersonal: personalUnrated,
            unratedGroup: groupUnrated
        })
    }

    updateRatingOnProject = (index, key, newRating) => {
        let copiedArr = [...this.state[key]]
        copiedArr[index].rating = newRating
        let tempObj = {}
        tempObj[key] = copiedArr
        console.log(111111, tempObj)
        this.setState(tempObj)
    }

    render() {
        //TODO: Match the frontend up with the backend after all the changes you made to the return object and splitting up the groups
        let {ratedGroup, ratedPersonal, unratedPersonal, unratedGroup} = this.state
        return (
            <div>
               {
                    ratedPersonal.map((project, index) => {
                            return (
                                <RatedPersonal 
                                project={project} 
                                key={project.project_id}
                                updateProjects={this.updateProjects}
                                updateRatingOnProject={this.updateRatingOnProject}/>
                            )
                    })
                }
                {
                    ratedGroup.map((project, index) => {
                            return (
                                <RatedGroup 
                                project={project} 
                                key={project.projectId}
                                updateProjects={this.updateProjects}
                                index={index}
                                updateRatingOnProject={this.updateRatingOnProject}/>
                            )
                    })
                } 
                {
                    unratedPersonal.map((project, index) => {
                            return (
                                <UnratedPersonal 
                                project={project} 
                                key={project.project_id}
                                updateProjects={this.updateProjects}/>
                            )
                    })
                } 
                {
                    unratedGroup.map((project, index) => {
                            return (
                                <UnratedGroup 
                                project={project} 
                                key={project.projectId}
                                updateProjects={this.updateProjects}/>
                            )
                    })
                } 
            </div>
        )
    }
}