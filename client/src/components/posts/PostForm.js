import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const maxPostLength = 2000;
class PostForm extends Component {
    state = {
        text: '',
       errors:{}
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.errors !== prevState.errors) {
            return {errors: nextProps.errors}
        }
        return null;
    }
    
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
    
         // validation 
         if(newPost.text.length < maxPostLength){
            this.props.addPost(newPost);
            this.setState({text:''});
         }
     
    }
    
    
    render() {
       const {errors} = this.state;
       const { isAuthenticated } = this.props.auth;
       console.log(isAuthenticated)
        return (
    
            <div className = "PostForm">
               <form className = "PostForm__form" onSubmit={ (e)=> this.onSubmitHandler(e) }>
                    <div className = "PostForm__textarea">
                        <TextAreaFieldGroup
                        placeholder= { isEmpty(errors.postErrors) ? 'Create a post' : errors.postErrors.text}
                        name="text"
                        value={this.state.text}
                        onChange={ (e)=> this.onChangeHandler(e)}
                        //  error={errors.text}
                        className = "form__textarea form__textarea-grey"
                        rows = {5}
                        />
                    </div>
                 
                    <div className = "PostForm__message">
                            {
                            this.state.text.length > maxPostLength ?
                                <div className = "PostForm__postLimitExceeded">
                                   {isAuthenticated ? `Post must be under ${maxPostLength} characters!` : 'Must be logged in to post'} 
                                </div> 
                            : null
                        }

                        {
                                this.state.text.length <= maxPostLength ?
                                <div className = "PostForm__postCharacterCount">
                                   { isAuthenticated ? `${maxPostLength - this.state.text.length} characters remaining!` : 'Must be logged in to post'  } 
                                </div> 
                            : null
                        }
                    </div>
                 
                    <button disabled = {!isAuthenticated} type="submit" className="PostForm__button">
                        Submit
                    </button>
                 
                </form>
            </div>
        );
    }
}
PostForm.propTypes = {
     auth: PropTypes.object.isRequired,
 //   errors: PropTypes.object.isRequired,
    addPost:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    errors: state.errors
  });


export default connect(mapStateToProps,{ addPost })(PostForm);