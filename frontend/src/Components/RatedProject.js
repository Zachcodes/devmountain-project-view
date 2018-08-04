import React, {Component} from 'react'

export default class RatedProject extends Component {
    constructor() {
        super()
    }
    render() {
        console.log(this.props)
        return (
            <div>
                Rated Project!
            </div>
        )
    }
}