import axios from 'axios';

import {
    GET_RESUMES,
    GET_RESUME,
    POST_RESUME
  } from './types';

// Get all resumes for the user
export const getResumes = () => dispatch => {
    axios
      .get(`/api/resume`)
      .then ( res => 
          dispatch ({
              type:GET_RESUMES,
              payload:res.data 
         })
      )
      .catch(err =>
        dispatch({
          type: GET_RESUMES,
          payload: []
        })
      );
  }

  // Get selected resume for that user ( from their resumes only )
  // id: This is the resume id.
export const getResume = (id) => dispatch => {
    axios
      .get(`/api/resume/${id}`)
      .then ( res => 
          dispatch ({
              type:GET_RESUME,
              payload:res.data 
         })
      )
      .catch(err =>
        dispatch({
          type: GET_RESUMES,
          payload: {}
        })
      );
  }



export const addResume  = () => dispatch => {

    axios
        .post(`/api/resume`)
        .then( res =>
            dispatch({
                type: POST_RESUME,
                payload:res.data // give back the specified resume
            })
        )
        .catch(err =>
            dispatch({
              type: POST_RESUME,
              payload: {}
            })
          );
}