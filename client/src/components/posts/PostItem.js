import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { addLike, removeLike, deletePost } from '../../actions/postActions';


import moment from 'moment';

import PostEditForm from './PostEditForm';
import ReplyForm from './replies/ReplyForm';
import Replies from './replies/Replies';
import Modal from 'react-modal';



const customStyles = {
    overlay:{
        backgroundColor:'rgba(0,121,191,0.85)',
        zIndex                :'999'
    },
    content : {
      position              :'fixed',
      top                   : '20%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'rgba(255, 255, 255, 0.95)',
      width                 :'80%',
      zIndex                :'1000'
    }
  };

class PostItem extends Component {

    state = {
        showOptions:false,
        showReplyOption:false,
        modalIsOpen:false,
    }

  

    componentDidMount() {
        Modal.setAppElement('body');
    }


    openModal = () => {
        this.setState({
            modalIsOpen:true
        })
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        
      }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            showOptions:false
        });
      }

    onLikeClick = (id) => {
        if(this.findUserLike(this.props.post.likes)){
            this.props.removeLike(id);
        }
        else {
            this.props.addLike(id);
        }
       
        this.findUserLike(this.props.post.likes);
    }
    onToolBar = (id) => {
        this.setState({showOptions:!this.state.showOptions})
    }
    onReplyClick = (id) => {
        this.setState({showReplyOption:!this.state.showReplyOption})
    }

    deletePostHandler = (id) => {
        this.props.deletePost(id);
      
   }



    findUserLike = (likes) => { 
      const { auth } = this.props;
      if ( likes.filter( like => like.user === auth.user.id).length > 0) {
        return true;
      }
      else {
          return false
      }
    }

    render() { 
        const { post, showActions, auth } = this.props;

    
        return (
            <React.Fragment>

           
            <div className = "PostItem">
          
                       {
                           this.state.showOptions ?
                        
                                <div>
                                        <div className= {classnames('PostOptions',{'PostOptions__disappear':this.state.modalIsOpen})} >
                                            <button className = "PostOptions__editPost"  onClick={this.openModal.bind(this)}>Edit Post</button>
                                            <button className = "PostOptions__deletePost" onClick={this.deletePostHandler.bind(this,post._id)}>Delete Post</button>
                                        </div>
                                    
                                        <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        contentLabel="PostEditFormModal"
                                        >
                                            <PostEditForm postId = {post._id}/>
                                        </Modal>
                                </div>
                     
            
                           
                            
                             : null   
                       }  
         
                    
                    <div className = "PostItem__content">

                        <span className = "PostItem__name">{post.name}</span> {post.text}

                        
                        <div className="PostItem__toolbar" >

                                <button className = "PostItem__ellipses" onClick = { this.onToolBar.bind(this) } >
                                            {
                                                this.state.showOptions ? 
                                                <FontAwesomeIcon
                                                    icon="times-circle"
                                                    style = {{color:`${this.findUserLike(post.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                                                 />
                                             
                                                :
                                                <FontAwesomeIcon
                                                    icon="ellipsis-h"
                                                    style = {{color:`${this.findUserLike(post.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                                                />
                                               
                                            }
                                            
                                </button>  
                        </div>
                                
                       

                          <div className = "PostItem__collection">
                                <span className = "PostItem__likes">
                                    <button className = "PostItem__like" onClick = {this.onLikeClick.bind(this,post._id)} >
                                        <FontAwesomeIcon
                                            icon="thumbs-up"
                                            style = {{color:`${this.findUserLike(post.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                                        />
                                    </button>
                                </span> 
                                <span className = "PostItem__replies">
                                    <button className = "PostItem__reply" onClick = {this.onReplyClick.bind(this,post._id)} >
                                        Reply
                                    </button>
                                </span> 
                                {
                                    post.likes.length > 0 ? 
                                    <span className = "PostItem__countLikesContainer">
                                        <button className = "PostItem__countLikes" onClick = {this.onReplyClick.bind(this,post._id)} >
                                        {post.likes.length === 1 ? `${post.likes.length} like` : `${post.likes.length} likes`}
                                        </button>
                                     </span> 
                                    :null
                                }
                               {
                                   post.replies.length > 0 ? 
                                   <span className = "PostItem__showHideRepliesContainer">
                                        <button className = "PostItem__showHideReplies" onClick = {this.onReplyClick.bind(this,post._id)} >
                                        {post.replies.length} Replies
                                        </button>
                                    </span> 
                                   :null
                               }
                                
                               
                          </div>
                    </div>    
            </div>

            {
                this.state.showReplyOption ? <ReplyForm postItem = {post}/> : null
            }

            {
                post.replies.length > 0 ? <div className = "replies">  <Replies postItem = {post} />  </div>  : null
            }
        

            </React.Fragment>

            
        );
    }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);