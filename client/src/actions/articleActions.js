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

export const getArticles = () => dispatch => {
  axios
    .get(`/api/articles`)
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
