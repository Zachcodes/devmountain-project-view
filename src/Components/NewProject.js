import React, {Component} from 'react'

export default class NewProject extends Component {
    constructor(props) {
        super()
        this.state = {
          name: '',
          description: '',
          url: '',
          images: [],
          type: props.type,
          walkthroughLink: '',
          groupMembers: [],
          imageInput: ''
        }
    }

    handleChange = (key, value) => {
        let obj = {}
        obj[key] = value 
        this.setState(obj)
    }

    clear = () => {
        this.setState({
          name: '',
          description: '',
          url: '',
          images: [],
          type: this.props.type,
          walkthroughLink: '',
          groupMembers: [],
          imageInput: ''
        })
    }

    render() {
        let {name, description, url, images, type, groupMembers, imageInput} = this.state
        return (
            <div>
                <div className="new-project-main-container">
                    <div>Name: <input value={name} onChange={(e) => this.handleChange('name', e.target.value)}/></div>
                    <div>Description: <input value={description} onChange={(e) => this.handleChange('description', e.target.value)}/></div>
                    <div>Url: <input value={url} onChange={(e) => this.handleChange('url', e.target.value)}/></div>
                    <div>
                        {
                            images.map(i => {
                                return (
                                    <span>
                                        Image
                                    </span>
                                )
                            })
                        }
                        New Image: <input value={imageInput} onChange={(e) => this.handleChange('imageInput', e.target.value)}/>
                    </div>
                    <div>
                        Type: 
                        {
                            type === 'personal'
                            ?
                            <select onChange={(e) => this.setState({type: e.target.options[e.target.selectedIndex].value})}>
                                <option value="personal" selected>Personal</option>
                                <option value="group">Group</option>
                            </select>
                            :
                            <select onChange={(e) => this.setState({type: e.target.options[e.target.selectedIndex].value})}>
                                <option value="personal">Personal</option>
                                <option value="group" selected>Group</option>
                            </select>
                        }
                    </div>
                    <div>
                        <button>Add</button>
                        <button onClick={this.clear}>Clear</button>
                    </div>
                </div>
                <button onClick={this.props.cancel}>Cancel</button>
            </div>
        )
    }
}