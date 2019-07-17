import {
    GET_LASTPAGE_HISTORY
} from '../actions/types';

const initialState = {
    lastpage: '',
    pages: []
}

export default function ( state = initialState, action ) {
    const { type } = action;
    switch (type) {
        case GET_LASTPAGE_HISTORY:
            return {
                ...state,
                lastpage: action
            }
        default:
            return state;
    }
}