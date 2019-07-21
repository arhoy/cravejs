import axios from 'axios';

import { GET_ARTICLE, GET_ARTICLES } from '../actions/types';

export const getArticle = id => dispatch => {
  //  dispatch(setArticleLoading());
  axios
    .get(`/api/articles/${id}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE,
        payload: null
      })
    );
};

export const getArticleByModel = model => async dispatch => {
    try {
        const res = await axios.get(`/api/articles/model/${model}`);

        dispatch({
          type: GET_ARTICLE,
          payload: res.data
        })
    } catch (error) {
      console.error('there was an error with the getArticleByModel action', error)
    }
}

export const getArticles = query => dispatch => {
  axios
    .get(`/api/articles${query}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLES,
        payload: null
      })
    );
};
