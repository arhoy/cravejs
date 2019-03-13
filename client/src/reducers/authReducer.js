import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, INITIAL_SIGNUP_SUCCESS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  signUpSuccess:false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case INITIAL_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess:action.payload
      }
    default:
      return state;
  }
}
