import axios from 'axios';
import {logoutUser} from './authActions'

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get current education
export const getCurrentEducation = () => dispatch => {

  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Add experience
export const addExperience = (expData,history) => dispatch =>  {  
  axios
    .post('/api/profile/experience',expData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload:err.response.data
        })
      );
};

// Add experience
export const addEducation = (expData,history) => dispatch =>  {  
  axios
    .post('/api/profile/education',expData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload:err.response.data
        })
      );
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get(`/api/profile/handle/${handle}`)
      .then(res =>
          dispatch({
            type: GET_PROFILE,
            payload:res.data
          })
      )
      .catch(err=>
          dispatch({
            type:GET_PROFILE,
            payload:null
          })
        )
};

// Delete experience 
export const deleteExperience = (id) => dispatch => {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then( res => {
        dispatch({
          type:GET_PROFILE,
          payload:res.data
        })
      })
      .catch( err => {
         dispatch({
           type: GET_ERRORS,
           payload: err.response.data
         })
      })
}

// Delete Education 
export const deleteEducation = (id) => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then( res => {
      dispatch({
        type:GET_PROFILE,
        payload:res.data
      })
    })
    .catch( err => {
       dispatch({
         type: GET_ERRORS,
         payload: err.response.data
       })
    })
}

// Delete Account 
export const deleteAccount = () => dispatch => {
  if( prompt("Enter DELETE to confirm") === "DELETE" ){
    axios
      .delete('/api/profile')
      .then( res => {
          dispatch(logoutUser())
      })
      .catch( err => {
         dispatch({
           type: GET_ERRORS,
           payload: err.response.data
         })
      })
  }
}