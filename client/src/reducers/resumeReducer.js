import {
    GET_RESUME,
    GET_RESUMES,
    RESUME_LOADING,
    POST_RESUME
} from '../actions/types';

const initialState = {
    resumes:[],
    resume:{},
    loading:false
}

export default function (state = initialState, action){
    switch(action.type){
        case RESUME_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_RESUMES:
            return {
                ...state,
                resumes: action.payload,
                loading:false
            }
        case GET_RESUME:
            return {
                ...state,
                resume: action.payload,
                loading:false
            }
        case POST_RESUME:
            return {
                ...state,
                resume:action.payload,
                loading:false
            }
        default:
            return state;
    }
}