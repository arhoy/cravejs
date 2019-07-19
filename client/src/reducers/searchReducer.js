import {
    GOOGLE_SEARCH,
    GOOGLE_SEARCH_ERROR
} from '../actions/types';

const initialState = {
    searchResults: [],
    loading: true,
    error: {}
}

export default function( state = initialState, action ){ 
    const { type, payload } = action;
    switch( type ){
       case GOOGLE_SEARCH:
           return {
               ...state,
               searchResults: payload,
               loading: false,
               error: {}
           } 
        case GOOGLE_SEARCH_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}