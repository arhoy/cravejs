import {
    GET_PORTFOLIOS
} from '../actions/types';

const initialState = {
    portfolios: [],
    loading:true,
};

export default function( state = initialState, action ) {
    const { type, payload } = action;

    switch( type ) {
        case GET_PORTFOLIOS:
            return {
                ...state,
                portfolios: payload,
                loading: false
            }
        default:
            return state;
    }
}