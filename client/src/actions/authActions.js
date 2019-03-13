import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS,INITIAL_SIGNUP_SUCCESS } from './types';

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/register', userData)
    .then(res => {
      dispatch ({
        type: INITIAL_SIGNUP_SUCCESS,
        payload:true
      })
        setTimeout(function () {
          // after 2 seconds
          window.location = "/login";
      }, 2000)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
