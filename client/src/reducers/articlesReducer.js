import {
    GET_ARTICLE,
    GET_ARTICLES,
    ARTICLES_LOADING
  } from '../actions/types';
  

const initialState = {
    articles:[],
    article:{},
    loading:false
}

export default function ( state = initialState, action ){
    switch(action.type){

        case ARTICLES_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_ARTICLE:
            return {
                ...state,
                article:action.payload,
                articles:[],
                loading:false
            }
        case GET_ARTICLES:
            return {
                ...state,
                articles:action.payload,
                article: [],
                loading:false
            }
     
        default:
            return state;
    }
}