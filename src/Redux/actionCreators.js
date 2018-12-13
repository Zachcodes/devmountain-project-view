import {GET_PROGRAMS, LOGIN, LOGIN_CHECK, LOGOUT, HIDE_MODAL, SHOW_MODAL} from './actions'
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

export function logout() {
    return {
        type: LOGOUT,
        payload: axios.delete('/api/logout')
    }
}

export function showModal(project) {
    console.log('project', project)
    return {
        type: SHOW_MODAL,
        payload: project
    }
}

export function hideModal() {
    return {
        type: HIDE_MODAL
    }
}