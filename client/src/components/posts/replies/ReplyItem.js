import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addReplyLike, removeReplyLike, deleteReply } from '../../../actions/postActions';
import moment from 'moment';
import Modal from 'react-modal';
import classnames from 'classnames';
import ReplyEditForm from './ReplyEditForm';

const customStyles = {
    overlay:{
        backgroundColor:'rgba(0,121,191,0.8)'
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

class ReplyItem extends Component {
    
    state = {
        showOptions:false
    }

    state = {
        showOptions:false,
        showReplyOption:false,
        modalIsOpen:false
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

    onLikeClick = (postId,replyId) => {
        if(this.findUserLike(this.props.reply.likes)){
            this.props.removeReplyLike(postId,replyId);
            
        }
        else{
          this.props.addReplyLike(postId,replyId);
        }
       
        this.findUserLike(this.props.reply.likes);
    }
    onToolBar = (id) => {
        this.setState({showOptions:!this.state.showOptions})
    }
    onReplyClick = (id) => {
        this.setState({showReplyOption:!this.state.showReplyOption})
    }

    deleteReplyHandler = (postId,replyId) => {
        this.props.deleteReply(postId,replyId);
      
   }

    findUserLike = (likes) => { 
      const { auth } = this.props;
     
      if( likes && likes.length > 0){
        if ( likes.filter( like => like.user === auth.user.id).length > 0) {
            return true;
          }
          else {
              return false
          }
      }
      else {return false}
     
  }

 

    render() {
        const { reply, postId } = this.props;
        const {likes} = this.props.reply;
     
        return (
    
            <div className = "ReplyItem">

                {
                    this.state.showOptions ?
                        <div>
                                <div className= {classnames('PostOptions',{'PostOptions__disappear':this.state.modalIsOpen})} >
                                    <button className = "PostOptions__editPost"  onClick={this.openModal.bind(this)}>Edit Reply</button>
                                    <button className = "PostOptions__deletePost" onClick={this.deleteReplyHandler.bind(this,postId,reply._id)}>Delete Reply</button>
                                </div>
                                
                                <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="ReplyForm Modal"
                                >
                                    <ReplyEditForm postId = {postId} replyId = {reply._id}/>
                                
                                </Modal>
                        </div>
                            : null   
                }  

                <div className = "ReplyItem__content">
                        <span className = "ReplyItem__name">{reply.name}</span> {reply.text}
                        <div className = "ReplyItem__toolbar">
                        <button className = "ReplyItem__ellipses" onClick  = { this.onToolBar.bind(this,reply._id) } >
                                <FontAwesomeIcon
                                    icon="ellipsis-h"
                                    style = {{color:`${this.findUserLike(this.props.reply.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                                />
                        </button>      
                        </div>
                        <span className = "ReplyItem__likes">
                        <button className = "ReplyItem__like" onClick = {this.onLikeClick.bind(this,postId,reply._id)} >
                            <FontAwesomeIcon
                                icon="thumbs-up"
                                style = {{color:`${this.findUserLike(this.props.reply.likes) ? 'rgb(0, 121, 191)' : 'white'}`, cursor:'pointer'}}
                            />
                        </button>
                        </span> 
                        <span className = "ReplyItem__countLikes">
                            <span className = "ReplyItem__countLike">{likes.length}</span> 
                        </span> 
                </div>

            </div>

        );
    }
}

// ReplyItem.defaultProps = {
//   showActions: true
// };

ReplyItem.propTypes = {
  deleteReply: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth:state.auth,
    post:state.post
});

export default connect(mapStateToProps, {deleteReply, addReplyLike,removeReplyLike } )(ReplyItem);