import {
    GET_LASTPAGE_HISTORY
} from './types';

export const getLastPageHistory = (lastpage) => dispatch => {
    dispatch({
        type: GET_LASTPAGE_HISTORY,
        payload: lastpage
    })
}
