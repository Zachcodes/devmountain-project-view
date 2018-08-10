import {GET_PROGRAMS} from './actions'
import axios from 'axios'

export function getPrograms() {
    return {
        type: GET_PROGRAMS,
        payload: axios.get('/api/programs')
    }
}