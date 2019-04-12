import axios from 'axios';
import {logoutUser} from './authActions'

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE_COMMENT
} from './types';

/** ACTIONS RELATED TO COMMENTS SECTION **/

// Get specific comment to a profile
export const getProfileComment = (handle,commentId) => dispatch => {
  axios
    .get(`/api/profile/comment/${handle}/${commentId}`)
    .then ( res => 
        dispatch ({
            type:GET_PROFILE_COMMENT,
            payload:res.data // gives back the specific profile comment
       })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE_COMMENT,
        payload: {}
      })
    );
}

// Get current comments to profile
export const getProfileComments = (handle) => dispatch => {
  axios
    .get(`/api/profile/comment/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: []
      })
    );
};

// Add comment
export const addComment = (handle,postData) => dispatch => {
 // dispatch(clearErrors());
  axios
  .post(`/api/profile/comment/${handle}`,postData)
  .then( res =>
      dispatch({
          type: GET_PROFILE,
          payload:res.data
      })
  )
  .catch( err =>
      dispatch({
          type:GET_ERRORS,
          payload: err.response.data
      })
  );
  dispatch(getProfileComments(handle));

}

export const editComment = (handle,commentId,postData) => dispatch => {
  // dispatch(clearErrors());
  axios
      .post(`/api/profile/comment/${handle}/${commentId}`,postData)
      .then( res => 
          dispatch({
              type: GET_PROFILE,
              payload: res.data
          })
      )
      .then( 
        res =>  dispatch(getProfileComments(handle))
      )
      .catch( err =>
          dispatch({
              type:GET_PROFILE,
              payload: {}
          })
      );
     
}

//Add Comment Like
export const addCommentLike = ( handle, commentId ) => dispatch => {

  axios
    .post(`/api/profile/comment/like/${handle}/${commentId}`)
    .then( res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data // res.data is comments data array.
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
    dispatch(getProfileComments(handle));
};

//Remove Comment Like
export const removeCommentLike = ( handle, commentId ) => dispatch => {
  axios
    .post(`/api/profile/comment/unlike/${handle}/${commentId}`)
    .then(({ data }) => {
      dispatch({
        type: GET_PROFILE,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
    dispatch(getProfileComments(handle));
};

export const deleteComment = (handle,commentId) => dispatch => {
  axios
    .delete(`/api/profile/comment/${handle}/${commentId}`)
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
    dispatch(getProfileComments(handle));

}



/** ACTIONS RELATED TO USER PROFILE ( Not including the comments section ) */

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

// Delete profile
export const deleteProfile = () => dispatch => {
  if( prompt("Are you sure you want to delete your profile? This action cannot be undone. If so type YES to delete your profile") === "YES"){
      axios
        .delete('/api/profile/deleteProfile')
        .then(res => {
            window.location = "/dashboard";
        })
        .catch( err => {
          dispatch ({
              type:GET_ERRORS,
              payload:err.response.data
          })
        })
  }
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