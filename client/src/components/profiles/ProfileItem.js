import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { addCommentLike, removeCommentLike, deleteComment } from '../../actions/profileActions';
import TimeAgo from 'react-timeago'


import ProfileEditForm from './ProfileEditForm';
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
      top                   : '50%',
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

class ProfileItem extends Component {

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

    closeModal = (e) => {
        this.setState({
            modalIsOpen: false,
            showOptions:false
        });
      }

    onLikeClick = (id) => {
        const { profile } = this.props.profile;

        if(this.findUserLike(this.props.comment.likes)){
            this.props.removeCommentLike(profile.handle,id);
        }
        else {
            this.props.addCommentLike(profile.handle,id);
        }
       
        this.findUserLike(this.props.comment.likes);
    }
    onToolBar = (id) => {
        this.setState({showOptions:!this.state.showOptions})
    }
    onReplyClick = (id) => {
        this.setState({showReplyOption:!this.state.showReplyOption})
    }

    deletePostHandler = (id) => {
        const { profile } = this.props.profile;
        this.props.deleteComment(profile.handle,id);
      
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
        const { comment } = this.props;
   
        return (
            <React.Fragment>

           
            <div className = "PostItem" style = {{backgroundColor:this.props.backgroundColor}}>
          
                       {
                           this.state.showOptions ?
                        
                                <div>
                                        <div className= {classnames('PostOptions',{'PostOptions__disappear':this.state.modalIsOpen})} >
                                            <button className = "PostOptions__editPost"  onClick={this.openModal.bind(this)}>Edit comment</button>
                                            <button className = "PostOptions__deletePost" onClick={this.deletePostHandler.bind(this,comment._id)}>Delete comment</button>
                                        </div>
                                    
                                        <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        contentLabel="PostEditFormModal"
                                        >
                                            <ProfileEditForm 
                                                commentId = {comment._id}
                                                handler = {this.closeModal}    
                                            />
                                        </Modal>
                                </div>
                     
            
                           
                            
                             : null   
                       }  
         
                    
                    <div className = "PostItem__content">

                        <span className = "PostItem__name">{comment.name}</span> {comment.text}
                        <div className = "PostItem__timeago" >
                             <TimeAgo live = {false} date= { comment.date }  />
                        </div>
                       

                        
                        <div className="PostItem__toolbar" >

                                <button className = "PostItem__ellipses" onClick = { this.onToolBar.bind(this) } >
                                            {
                                                this.state.showOptions ? 
                                                <FontAwesomeIcon
                                                    icon="times-circle"
                                                    style = {{color:`${this.findUserLike(comment.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                                                 />
                                             
                                                :
                                                <FontAwesomeIcon
                                                    icon="ellipsis-h"
                                                    style = {{color:`${this.findUserLike(comment.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                                                />
                                               
                                            }
                                            
                                </button>  
                        </div>
                                
                       

                          <div className = "PostItem__collection">  
                                <span className = "PostItem__likes">
                                    <button className = "PostItem__like" onClick = {this.onLikeClick.bind(this,comment._id)} >
                                        <FontAwesomeIcon
                                            icon="thumbs-up"
                                            style = {{color:`${this.findUserLike(comment.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                                        />
                                    </button>
                                </span> 
                                <span className = "PostItem__replies">
                                    <button className = "PostItem__reply" onClick = {this.onReplyClick.bind(this,comment._id)} >
                                        Reply
                                    </button>
                                </span> 
                                {
                                    comment.likes.length > 0 ? 
                                    <span className = "PostItem__countLikesContainer">
                                        <button className = "PostItem__countLikes" onClick = {this.onReplyClick.bind(this,comment._id)} >
                                        {comment.likes.length === 1 ? `${comment.likes.length} like` : `${comment.likes.length} likes`}
                                        </button>
                                     </span> 
                                    :null
                                }
                               {
                                comment.replies.length > 0 ? 
                                   <span className = "PostItem__showHideRepliesContainer">
                                        <button className = "PostItem__showHideReplies" onClick = {this.onReplyClick.bind(this,comment._id)} >
                                        {comment.replies.length} Replies
                                        </button>
                                    </span> 
                                   :null
                               }
                             
                          </div>
                    </div>    
            </div>

            {
                this.state.showReplyOption ? <ReplyForm postItem = {comment}/> : null
            }

            {
                comment.replies.length > 0 ? <div className = "replies">  <Replies backgroundColor = {this.props.backgroundColor} postItem = {comment} />  </div>  : null
            }
        

            </React.Fragment>

            
        );
    }
}

ProfileItem.defaultProps = {
  showActions: true
};

ProfileItem.propTypes = {
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps, { addCommentLike, removeCommentLike, deleteComment })(ProfileItem);