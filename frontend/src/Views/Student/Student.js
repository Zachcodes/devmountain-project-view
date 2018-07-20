import React, {Component} from 'react'
import axios from 'axios';
import default_picture from '../../images/live_long_and_prosper.jpg';

export default class Student extends Component {
    constructor() {
        super()
        this.state = {
            first: '',
            last: '',
            projects: [],
            image: ''
        }
    }
    componentDidMount() {
        axios.get(`/api/students/${this.props.match.params.studentid}`).then( response => {
            let {data} = response;
            let first, last;
            let projects = [];
            let image;
            for(let i = 0; i < data.length; i++) {
                if(!first) first = data[i].first 
                if(!last) last = data[i].last 
                if(!image) image = data[i].image 
                let tempProject = {
                    projectName: data[i].project_name,
                    url: data[i].url,
                    projectType: data[i].project_type
                }
                projects.push(tempProject)
            }
            this.setState({
                first, 
                last,
                projects,
                image
            })

        })
    }

    render() {
        return (
            this.state.first.length > 0 ?
            <div>
                <p>{this.state.first} {this.state.last}</p>
                <img src={default_picture}/>
                {
                    this.state.projects.map((project, index) => {
                        let type = project.projectType === 1 ? 'Personal' : 'Group'
                        return (
                            <div key={index}>
                                <p>{type}: {project.projectName}</p>
                                <p>Url: {project.url}</p>
                            </div>
                        )
                    })
                }
            </div>
            :
            null
        )
    }
}