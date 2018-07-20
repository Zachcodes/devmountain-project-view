import React, {Component} from 'react'
import axios from 'axios';

//components
import GroupProject from '../../Components/GroupProject'
import PersonalProject from '../../Components/PersonalProject'

export default class CohortDetails extends Component {
    constructor() {
        super()
        this.state = {
            groupProjects: [],
            personalProjects: []
        }
    }
    componentDidMount() {
        let {cohortid} = this.props.match.params;
        axios.get(`/api/cohorts/${cohortid}/projects`).then(res => {
            let personal = res.data.personalProjects;
            let group = res.data.splitGroups;
            let tempGroup = []
            for(let groupid in group) {
                tempGroup.push(group[groupid])
            }
            this.setState({
                groupProjects: tempGroup,
                personalProjects: personal
            })
        })
    }
    render() {
        return (
            <div>
                <div>
                    <h2>Personal Projects</h2>
                    {
                        this.state.personalProjects.map( (project, index) => {
                            return <PersonalProject key={index} projectDetails={project} />
                        })
                        
                    }
                </div>
                <div>
                    <h2>Group Projects</h2>
                    {
                        this.state.groupProjects.map( (project, index) => {
                            return <GroupProject key={index} projectDetails={project.projectInfo} members={project.members} />
                        })
                    }
                </div>
            </div>
        )
    }
}