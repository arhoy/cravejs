import {
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    DELETE_POST,
    ADD_POST,
    LIKE_POST,
    GET_REPLIES,
    GET_REPLY
  } from '../actions/types';
  

const initialState = {
    posts:[],
    post:{},
    loading:false
}

export default function ( state = initialState, action ){
    switch(action.type){

        case POST_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_POST:
            return {
                ...state,
                post:action.payload,
                loading:false
            }
        case GET_POSTS:
            return {
                ...state,
                posts:action.payload,
                loading:false
            }
        case ADD_POST:
            return {
                ...state,
                posts:[action.payload,...state.posts]
            }
        case DELETE_POST:
            return { 
                ...state,
                posts: state.posts.filter( post => post._id !== action.payload )
            }

        case GET_REPLY: 
        // get reply action.payload has a postId and a replyObj.
            const postIndex = state.posts.map( item => item._id.toString() ).indexOf(action.payload.postId);
            console.log(action.payload);
            console.log(postIndex);
            const post = state.posts[postIndex];
        
            return {
                ...state,
                 post: post.replies.filter( reply => reply._id === action.payload.replyObj._id) 
            }
        case GET_REPLIES:
            return {
                ...state,
                posts: state.posts.map(post => {
                    return {
                        ...post,
                        ...action.payload
                    }
                })
            }

        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                if (post._id === action.payload._id) {
                    return {
                    ...post,
                    ...action.payload
                    };
                } else {
                    return post;
                }
                })
        };
      
     
        default:
            return state;
    }
}