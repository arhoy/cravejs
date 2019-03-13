import axios from 'axios';
import {
    GET_ORDERS,
    GET_ORDER,
    ORDERS_LOADING,
    SUBMIT_ORDER
} from './types';

// Loading orders
export const setOrderLoading = () => {
    return {
        type:ORDERS_LOADING
    }
}
// get all the orders for logged in user
export const getOrders = () => dispatch => {
    dispatch(setOrderLoading())
    axios
        .get('/api/order')
        .then( res => 
            dispatch ({
                type: GET_ORDERS,
                payload: res.data
            })
        )
        .catch( err => 
            dispatch({
                type: GET_ORDERS,
                payload:[]
            })
        )
}

export const getOrder = (id) => dispatch =>{
    dispatch(setOrderLoading())
    axios
        .get(`/api/order/${id}`)
        .then( res => 
            dispatch({
                type: GET_ORDER,
                payload:res.data
            })
        )
        .catch( err => 
            dispatch({
                type: GET_ORDER,
                payload: {}
            })
        )
}

export const submitOrder = (data) => dispatch => {
    axios.
        post('/api/order',data)
        .then( res =>
            dispatch({
                type:SUBMIT_ORDER,
                payload:res.data
            })
        )
        .catch( err => 
            dispatch({
                type: SUBMIT_ORDER,
                payload:{}
            })
        )
}