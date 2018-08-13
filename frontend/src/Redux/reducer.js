import {GET_PROGRAMS_FULFILLED, 
        LOGIN_FULFILLED, 
        LOGIN_REJECTED,
        LOGIN_CHECK_FULFILLED,
        LOGIN_CHECK_REJECTED} from './actions'

const initialState = {
    programs: [],
    loggedIn: false,
    errorLoggingIn: false
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
        default: 
            return state;
    }
}

