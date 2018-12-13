import {GET_PROGRAMS_FULFILLED, 
        LOGIN_FULFILLED, 
        LOGIN_REJECTED,
        LOGIN_CHECK_FULFILLED,
        LOGOUT_FULFILLED,
        HIDE_MODAL,
        SHOW_MODAL
       } from './actions'

const initialState = {
    programs: [],
    loggedIn: false,
    errorLoggingIn: false,
    showModal: false,
    selectedModalProject: {}
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PROGRAMS_FULFILLED:
            return {
                ...state,
                programs: action.payload.data.types
            }
        case LOGIN_FULFILLED:
            return {
                ...state,
                loggedIn: true
            }
        case LOGIN_REJECTED:
            return {
                ...state,
                errorLoggingIn: true
            }
        case LOGIN_CHECK_FULFILLED:
            return {
                ...state,
                loggedIn: action.payload.data.loggedIn ? true : false
            }
        case LOGOUT_FULFILLED:
            return {
                ...state,
                loggedIn: false
            }
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false,
                selectedModalProject: {}
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true,
                selectedModalProject: action.payload
            }
        default: 
            return state;
    }
}

