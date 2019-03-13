import axios from 'axios';
import { GET_ERRORS, GET_USER_CART, CLEAR_ERRORS,
    REMOVE_ITEM_FROM_USER_CART, CLEAR_USER_CART,
    GET_CURRENT_CART_TOTAL,
    CART_LOADING 
} from './types';


export const setCartLoading = () => {
    return {
        type:CART_LOADING
    }
}

// return a cart object with array of the user cart items.
export const getUserCart = () => dispatch => {
    dispatch(setCartLoading())
    axios
        .get('/api/users/current')
        .then( res => {
            dispatch ({
                type: GET_USER_CART,
                payload: res.data.cart
            })
        })
        .catch ( err => 
            dispatch ({
                type: GET_USER_CART,
                action: []
            })
        )
}
export const getCurrentCartTotal = () => dispatch => {
    dispatch(setCartLoading())
    axios
        .get('/api/users/currentTotal')
        .then( res => {
            dispatch ({
                type: GET_CURRENT_CART_TOTAL,
                payload: res.data
            })
        })
        .catch ( err => 
            dispatch ({
                type: GET_CURRENT_CART_TOTAL,
                action: {}
            })
        )
}


export const removeProductItemFromCart = (id) => dispatch => {

    axios
        .post(`/api/product/remove/${id}`)
        .then( res => {
            dispatch ({
                type: REMOVE_ITEM_FROM_USER_CART,
                payload: res.data.cart
            })
        })
        .then ( res => dispatch(getUserCart()) )
        .catch( err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
         })
}
// remove all items from user cart
export const clearUserCart = () => dispatch => {
    axios
        .post('/api/product/remove')
        .then( res => 
            dispatch ({
                type: CLEAR_USER_CART,
                payload: []
            })
        )
        .catch( err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
         })
}
