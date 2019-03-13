
import {
    PRODUCTS_LOADING,
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT_TO_CART
} from '../actions/types';

const initialState = {
    products:[],
    product:{},
    loading:false
}

export default function( state = initialState, action) {
    switch (action.type){

        case PRODUCTS_LOADING: 
        return {
            ...state,
            loading:true
        }

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading:false
            }
        case GET_PRODUCT:
            return {
                ...state,
                product:action.payload,
                loading:false
            }
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                product:action.payload,
                loading:false
            }
        default:
            return state;
    }
}