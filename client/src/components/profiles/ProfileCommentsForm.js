import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { withRouter } from 'react-router-dom';
import { addComment } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const maxPostLength = 2000;
class ProfileCommentsForm extends Component {
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
        const {handle} = this.props.match.params;
        const { user } = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
    
         // validation 
         if(newPost.text.length < maxPostLength && handle !== ''){
            this.props.addComment(handle,newPost);
            this.setState({text:''});
         }
     
    }
    
    
    render() {
       const {errors} = this.state;
       const { isAuthenticated } = this.props.auth;
       const { backgroundColor,placeholder, color } = this.props;

        return (
    
            <div className = "PostForm" style = {{backgroundColor, color}} >
               <form className = "PostForm__form" onSubmit={ (e)=> this.onSubmitHandler(e) }>
                    <div className = "PostForm__textarea">
                        <TextAreaFieldGroup
                        placeholder= { isEmpty(errors.postErrors) ? placeholder : errors.postErrors.text}
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
                                <div className = "PostForm__postCharacterCount" style = {{color}}>
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
ProfileCommentsForm.propTypes = {
     auth: PropTypes.object.isRequired,
 //   errors: PropTypes.object.isRequired,
    addComment:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    errors: state.errors
  });


export default connect(mapStateToProps,{ addComment })(withRouter(ProfileCommentsForm));