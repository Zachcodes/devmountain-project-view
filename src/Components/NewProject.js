import React, {Component} from 'react'

export default class NewProject extends Component {
    constructor(props) {
        super()
    }
    render() {
        return (
            <div>
                New Project
                <button onClick={this.props.cancel}>Cancel</button>
            </div>
        )
    }
}