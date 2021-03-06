import React, {Component} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

//components 
import RatedProject from './RatedProject'
import UnratedProject from './UnratedProject'

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
        axios.get('/api/loadDashboard/staff').then(response => {
            this.updateProjects(response.data)
        })
    }

    updateProjects = (projectsArr, toastMessage) => {
        let {rated, unrated} = projectsArr
        let {group: groupUnrated, personal: personalUnrated} = unrated; 
        let {group: groupRated, personal: personalRated} = rated;
        this.setState({
            ratedPersonal: personalRated,
            ratedGroup: groupRated,
            unratedPersonal: personalUnrated,
            unratedGroup: groupUnrated
        }, () => {
            toast.success(toastMessage)
        })
    }

    updateRatingOnProject = (index, key, newRating) => {
        let copiedArr = [...this.state[key]]
        copiedArr[index].rating = newRating
        let tempObj = {}
        tempObj[key] = copiedArr
        this.setState(tempObj, () => {
            toast.success('Successfully updated project')
        })
    }

    render() {
        let {ratedGroup, ratedPersonal, unratedPersonal, unratedGroup} = this.state
        return (
            <div>
               {
                    ratedPersonal.map((project, index) => {
                            return (
                                <RatedProject 
                                project={project} 
                                key={project.projectId}
                                updateProjects={this.updateProjects}
                                index={index}
                                updateRatingOnProject={this.updateRatingOnProject}
                                type="personal"/>
                            )
                    })
                }
                {
                    ratedGroup.map((project, index) => {
                            return (
                                <RatedProject 
                                project={project} 
                                key={project.projectId}
                                updateProjects={this.updateProjects}
                                index={index}
                                updateRatingOnProject={this.updateRatingOnProject}
                                type="group"/>
                            )
                    })
                } 
                {
                    unratedPersonal.map((project, index) => {
                            return (
                                <UnratedProject 
                                project={project} 
                                key={project.projectId}
                                updateProjects={this.updateProjects}
                                type="personal"/>
                            )
                    })
                } 
                {
                    unratedGroup.map((project, index) => {
                            return (
                                <UnratedProject 
                                project={project} 
                                key={project.projectId}
                                updateProjects={this.updateProjects}
                                type="group"/>
                            )
                    })
                } 
                <ToastContainer/>
            </div>
        )
    }
}