import {
    GET_USER_CART,
    CART_LOADING,
    REMOVE_ITEM_FROM_USER_CART,
    GET_CURRENT_CART_TOTAL,
    CLEAR_USER_CART
} from '../actions/types';

const initialState = {
    cart: [],
    cartTotal: {},
    loading:false
}

export default function ( state = initialState, action ) {
    switch ( action.type ) {
        case CART_LOADING: 
            return {
                ...state,
                loading:true
            }
        case GET_USER_CART:
            return {
                ...state,
                cart: action.payload.items,
                loading:false
            }
        case GET_CURRENT_CART_TOTAL:
            return {
                ...state,
                cartTotal:action.payload,
                loading:false

            }

        // action.payload.items returns the updated user cart
        case REMOVE_ITEM_FROM_USER_CART:
            return {
                ...state,
                cart: action.payload.items,
                loading:false
            }
        case CLEAR_USER_CART:
            return {
                ...state,
                loading:false,
                cart: action.payload
            }
        default: 
            return state
    }
}