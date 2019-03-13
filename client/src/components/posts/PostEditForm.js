import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEditPost, getPost } from '../../actions/postActions';
import PropTypes from 'prop-types';

class PostEditForm extends Component {
    componentDidMount() {
        console.log(this.props);
        const {posts} = this.props.post;
        const {postId} = this.props;
        this.props.getPost(postId);

    }
    
    state = {
        text: '',
       // errors:{}
    }
    
    componentWillReceiveProps(nextProps) {
        // if (nextProps.errors) {
        //   this.setState({ errors: nextProps.errors });
        // }
        console.log('These are the next props',nextProps)
        if(nextProps.post.post){
            const post = nextProps.post.post;

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
        const {postId} = this.props;
        const { user } = this.props.auth;
        const editPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        console.log('I was submited',editPost,postId);
         this.props.addEditPost(postId,editPost,this.props.history); // it will look for postId in the backend
        this.setState({text:''});
    
        
    }
    
    
    render() {
       // const {errors} = this.state;

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
PostEditForm.propTypes = {
     auth: PropTypes.object.isRequired,
     addEditPost:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    post: state.post
  });


export default connect(mapStateToProps,{ addEditPost,getPost })(withRouter(PostEditForm));