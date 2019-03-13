import axios from 'axios';

import {
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    DELETE_POST,
    ADD_POST,
    GET_ERRORS,
    GET_POST_ERRORS,
    GET_REPLY_ERRORS,
    CLEAR_ERRORS,
    LIKE_POST,
    ADD_REPLY,
    GET_REPLY,
    GET_REPLIES
  } from '../actions/types';


export const addPost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios
    .post(`/api/posts`,postData)
    .then( res =>
        dispatch({
            type: ADD_POST,
            payload:res.data
        })
    )
    .catch( err =>
        dispatch({
            type:GET_POST_ERRORS,
            payload: err.response.data
        })
    );
    dispatch(getPosts());

}

export const addEditPost = (id,postData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/${id}`,postData)
        .then( res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .then( 
            res => dispatch(getPosts())
        )
        .catch( err =>
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );
}







// ADD REPLY FOR SPECIFIC POST
// add reply
export const addReply = (postId, replyData) => dispatch => {
    dispatch(clearErrors());
    
    axios
        .post(`/api/posts/reply/${postId}`,replyData)
        .then( res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .then( 
            res => dispatch(getPosts())
        )
        .catch( err =>
            dispatch({
                type:GET_REPLY_ERRORS,
                payload: err.response.data
            })
        );
}

export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then( res =>
            // console.log(res.data)
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_POSTS,
                payload: null
            })
        );
  
}


export const getPost = id => dispatch => {
 
    axios
        .get(`/api/posts/${id}`)
        .then( res =>
            // console.log(res.data)
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_POST,
                payload: null
            })
        );

}

// populate the replies.
export const getReply = (postId,replyId) => dispatch => {
    axios
        .post(`/api/posts/${postId}/${replyId}`)
        .then( res =>
            dispatch({
                type: GET_REPLY,
                payload:res.data
            })
    
        )
        .catch( err =>
            dispatch({
                type:GET_REPLY,
                payload: null
            })
        );
}


// add edit post reply
export const addEditPostReply = (postId,replyId,postData) => dispatch => {
    axios
        .post(`/api/posts/reply/${postId}/${replyId}`,postData)
    
        .then(  res => 
            dispatch({
                type: GET_REPLY,
                payload:res.data
            })
        )
        .then( 
            res => dispatch(getPosts())
        )
        .catch( err =>
            dispatch({
                type:GET_REPLY,
                payload: err.response.data
            })
        );
}



export const deletePost = id => dispatch => {
    axios
      .delete(`/api/posts/${id}`)
      .then( res => {
        dispatch({
          type:DELETE_POST,
          payload:id
        })
      })
      .catch( err => {
         dispatch({
           type: GET_ERRORS,
           payload: err.response.data
         })
      })
}



//Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

// Add Reply Like
export const addReplyLike = (postId, replyId)  => dispatch => {
    axios
        .post(`/api/posts/reply/like/${postId}/${replyId}`)
        .then( ({data}) =>
            dispatch({
                type: LIKE_POST,
                payload: data
            })
        )
        .then ( res => dispatch(getPosts()))
        .catch( err =>
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );
}

 
//Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

//Remove Reply Like
export const removeReplyLike = (postId,replyId) => dispatch => {
    axios
      .post(`/api/posts/reply/unlike/${postId}/${replyId}`)
      .then(({ data }) => {
        dispatch({
          type: LIKE_POST,
          payload: data //pass in updated post
        });
      })
      .catch(({ response }) => {
        dispatch({
          type: GET_ERRORS,
          payload: response.data
        });
      });
  };
  


// Set loading state
export const setPostLoading = () => {
    return {
      type: POST_LOADING
    };
  };
  
  // Clear errors
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };



// GET all replies for a specific post id
// payload is an array or reply objects.
export const getReplies = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/reply/${id}`)
        .then( res =>
            dispatch({
                type: GET_REPLIES,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_REPLIES,
                payload: null
            })
        );
    console.log('ran get replies');
}
  


// delete reply
export const deleteReply = (postId, replyId)  => dispatch => {
    dispatch(clearErrors());
    axios
        .delete(`/api/posts/reply/${postId}/${replyId}`)
        .then( ({data}) =>
            // console.log(res.data)
            dispatch({
                type: GET_POST,
                payload: data
            })
        )
        .then ( res => dispatch(getPosts()))
        .catch( err =>
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );
}

