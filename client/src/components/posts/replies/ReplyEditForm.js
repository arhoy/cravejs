import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addEditPostReply,getReply } from '../../../actions/postActions';
import PropTypes from 'prop-types';

class ReplyEditForm extends Component {
    componentDidMount() {
        console.log(this.props);
        const {replyId, postId} = this.props;
        this.props.getReply(postId,replyId);
    }
    
    state = {
        text: ''
       // errors:{}
    }
    
    componentWillReceiveProps(nextProps) {
        // if (nextProps.errors) {
        //   this.setState({ errors: nextProps.errors });
        // }
        console.log('These are the next props',nextProps);
        if(nextProps.post.post){
            const post = nextProps.post.post[0];

            // set component fields state.
            this.setState({
                text: post.text
              });
    
        }
      }
      
    
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const { replyId, postId } = this.props;
        const { user } = this.props.auth;
        const dataToSubmit = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        console.log('I was submited',dataToSubmit,replyId);
         this.props.addEditPostReply(postId,replyId,dataToSubmit); // it will look for replyId in the backend
        this.setState({text:''});
    
        
    }
    
    
    render() {
       // const {errors} = this.state;
       console.log(this.props);

        return (
    
            <div className = "PostEditForm" style = {{zIndex: 1000}}>
               <form className = "PostEditForm__form" onSubmit={ (e)=> this.onSubmitHandler(e) }>
                  <div className="form__group">
                    <TextAreaFieldGroup
                      placeholder="Edit post"
                      name="text"
                      value={this.state.text}
                      onChange={ (e)=> this.onChangeHandler(e)}
                    //  error={errors.text}
                      className = "form__textarea form__textarea-grey"
                      rows = {5}
                    />
                  </div>
                    <button type="submit" className="PostEditForm__button">
                        Edit Post
                    </button>
                </form>
            </div>
        );
    }
}
ReplyEditForm.propTypes = {
     auth: PropTypes.object.isRequired,
     addEditPostReply:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    post: state.post
  });


export default connect(mapStateToProps,{ addEditPostReply,  getReply })(withRouter(ReplyEditForm));