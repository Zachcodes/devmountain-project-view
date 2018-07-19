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
        if(!this.state.grabbedData){
            axios.get('/api/programs').then(programs => {
                if(programs.data.length) {
                    this.setState({
                        programs: programs.data,
                        grabbedData: true
                    })
                }
                else {
                    this.setState({
                        grabbedData: true
                    })
                }
            }).catch(err => {
                if(err) {
                    this.setState({
                        grabbedData: true
                    })
                }
            })
        }
    }
    render() {
        return (
            <div className="program-container">
                {this.state.programs.map(element => {
                   return( <Link to={`programs/cohorts/${element.id}`} key={element.id}>
                        {element.type}
                    </Link>)
                })}
            </div>
        )
    }
}