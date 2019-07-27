import axios from 'axios';
import {
    GET_PORTFOLIOS
} from './types';

export const getPorfolio = () => async dispatch => {
    try {
        const res = await axios.get('/api/portfolio');
        dispatch({
            type: GET_PORTFOLIOS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type: GET_PORTFOLIOS,
            payload: []
        })
    }
}