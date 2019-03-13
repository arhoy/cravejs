import {
    GET_ORDERS,
    GET_ORDER,
    ORDERS_LOADING,
    SUBMIT_ORDER
} from '../actions/types';

const initialState = {
    orders:[],
    order:{},
    loading:false
}

export default function (state = initialState, action){
    switch(action.type){
        case ORDERS_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading:false
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload,
                loading:false
            }
        case SUBMIT_ORDER:
            return {
                ...state
            }
        default:
            return state;
    }
}