import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addReply, getPosts } from '../../../actions/postActions';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';


class ReplyForm extends Component {
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
    onSubmitHandler = (e,id) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const newReply = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        console.log('I replied');
        this.props.addReply(id,newReply);
        this.setState({text:''});
        
     
    }
    
    
    render() {
        const {errors} = this.state;
        const {postItem} = this.props;
        return (
    
            <div className="ReplyForm">            
               <form className = "ReplyForm__form" onSubmit={ (e)=> this.onSubmitHandler(e,postItem._id) }>
                  <div className="form__group">
                    <TextAreaFieldGroup
                      placeholder= { isEmpty(errors.replyErrors) ? 'Add a reply...' : errors.replyErrors.text}
                      name="text"
                      value={this.state.text}
                      onChange={ (e)=> this.onChangeHandler(e)}
                      error={errors.text}
                      className = "form__textarea form__textarea-grey"
                      rows = {1}
                    />
                  </div>
                    <button type="submit" className="ReplyForm__button">
                        Reply
                    </button>
                </form>
            </div>
           
        );
    }
}
ReplyForm.propTypes = {
     auth: PropTypes.object.isRequired,
     errors: PropTypes.object.isRequired,
     addReply:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    errors: state.errors,
    post: state.post
  });


export default connect(mapStateToProps,{ addReply,getPosts })(ReplyForm);