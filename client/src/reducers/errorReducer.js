import { 
  GET_ERRORS, CLEAR_ERRORS, GET_POST_ERRORS,GET_REPLY_ERRORS
   } 
  from '../actions/types';

const initialState = {
    postErrors: {

    },
    replyErrors:{

    }

};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    case CLEAR_ERRORS:
      return {};

    case GET_POST_ERRORS:
      return {
          ...state,
          postErrors: action.payload
      } 
    case GET_REPLY_ERRORS:
      return {
          ...state,
          replyErrors: action.payload
      } 

    default:
      return state;
  }
}
