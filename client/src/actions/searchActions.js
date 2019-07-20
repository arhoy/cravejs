import axios from 'axios';
import { GOOGLE_SEARCH, GOOGLE_SEARCH_ERROR, CLEAR_GOOGLE_SEARCH } from './types';

export const googleCustomSearch = query => async dispatch => {

    try {
        const res = await axios.get(`/api/gcse/${query}`);
        if(res === null || res === [] || res === ''){
            console.log('why is this runnuing');
            dispatch({
                type: GOOGLE_SEARCH_ERROR,
                payload: {msg: 'No Search Results'}
            })
        } else {
            dispatch({
                type: GOOGLE_SEARCH,
                payload: {
                    searchResults:res.data,
                    query:query
                }
            })
        }
    
    } catch (error) {
        console.error(error);
        dispatch({
            type: GOOGLE_SEARCH_ERROR,
            payload: {msg: 'Oops, could not find what you were searching for!'}
        })
    }
}

export const clearGoogleCustomerSearch = () => dispatch => {
    try {
        dispatch({
            type: CLEAR_GOOGLE_SEARCH
        })
    } catch (error) {
        console.error('Could not clear the search results', error)
    }
}