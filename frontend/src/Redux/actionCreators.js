import {GET_PROGRAMS, LOGIN, LOGIN_CHECK} from './actions'
import axios from 'axios'

export function getPrograms() {
    return {
        type: GET_PROGRAMS,
        payload: axios.get('/api/programs')
    }
}

export function login(body) {
    return {
        type: LOGIN,
        payload: axios.post('/api/login', body)
    }
}

export function checkLogin() {
    return {
        type: LOGIN_CHECK,
        payload: axios.get('/api/loginCheck')
    }
}