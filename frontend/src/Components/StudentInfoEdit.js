import React, {Component} from 'react'
import axios from 'axios'

import ImageUploader from './ImageUploader'

export default class StudentInfoEdit extends Component {
    constructor() {
        super()
        this.state = {
            aboutInput: ''
        }
    }

    handleChange = (key, val) => {
        let obj = {}
        obj[key] = val;
        this.setState(obj)
    }

    submitChange = (e) => {
        e.preventDefault()
        axios.put('/api/students/updateAbout', {about: this.state.aboutInput}).then( res => {
            this.props.resetStudentData(res.data)
            this.setState({aboutInput: ''})
        })
    }

    render() {
        let {aboutInput} = this.state;
        return (
            <form onSubmit={this.submitChange} className="student-info-edit-form">
                <div>
                    <label>About</label> <input value={aboutInput} onChange={(e) => this.handleChange('aboutInput', e.target.value)}></input>
                </div>
                <div>
                    <label>Choose new picture</label>
                    <ImageUploader resetStudentData={this.props.resetStudentData}/>
                </div>
            </form>
        )
    }
}