import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Program.css'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            programs: [],
            grabbedData: false
        }
    }
    componentDidMount() {
            axios.get('/api/programs').then(programs => {
                this.setState({
                    programs: programs.data
                })
            }).catch(err => {
                if(err) {
                    alert('Could no get programs')
                }
            })
    }
    render() {
        return (
            this.state.programs.length > 0 ?
            <div className="program-container">
                {this.state.programs.map(element => {
                   return (
                    <Link to={`programs/cohorts/${element.id}`} key={element.id}>
                        {element.type}
                    </Link>
                    )
                })}
            </div>
            :
            null
        )
    }
}