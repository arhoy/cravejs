import axios from 'axios';
import {
    PRODUCTS_LOADING,
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT_TO_CART
} from './types';

// products loading
export const productsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}

// get all the products
export const getProducts = () => dispatch => {
    dispatch(productsLoading())
    axios
        .get('/api/product')
        .then( res => 
            dispatch ({
                type: GET_PRODUCTS,
                payload: res.data
            })
        )
        .catch( err => 
            dispatch({
                type: GET_PRODUCTS,
                payload:{}
            })
        )
}

export const getProduct = id => dispatch => {
    dispatch(productsLoading())
    axios
        .get(`/api/product/${id}`)
        .then( res => 
            dispatch ({
                type: GET_PRODUCT,
                payload:res.data
            })
        )
        .catch( err => 
            dispatch({
                type: GET_PRODUCT,
                payload:{}
            })
        )
}

export const addProductToCart = id => dispatch => {
    axios
        .post(`/api/product/add/${id}`)
        .then( () => { console.log('added product item to cart',id)})
        .catch( () => { console.log('There was an error adding item to cart',id) })
}