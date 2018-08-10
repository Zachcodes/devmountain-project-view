import {GET_PROGRAMS_FULFILLED} from './actions'

const initialState = {
    programs: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PROGRAMS_FULFILLED:
            return {
                programs: action.payload.data.types
            }
        default: 
            return state;
    }
}

