import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { getProfileComment, editComment } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class ProfileEditForm extends Component {
    componentDidMount() {
   
        if(this.props.match.params.handle){
            const {handle} = this.props.match.params;
            console.log(handle);
            console.log(this.props);
             this.props.getProfileComment(handle,this.props.commentId);
        }
       
    }
    
    state = {
        text: '',
       // errors:{}
    }
    // when getProfileComment Updates, setState from reducer.
    componentDidUpdate(prevProps, prevState) {
        if(prevState.text === "" && this.props.profile.comment.text !== ""){
            // check conditions, set the state
            this.setState({
                text: this.props.profile.comment.text
            })
        }
     
    }
    
      
    
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const { handle } = this.props.profile.profile;
    
        const {commentId} = this.props;
        const { user } = this.props.auth;
        const editComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        console.log('I was submited',handle,editComment,commentId);
         this.props.editComment(handle,commentId,editComment); // it will look for commentId in the backend
        this.setState({text:''});

        // close the modal
        setTimeout(()=>{
            this.props.handler();
        },600 )
      
        
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
                        Save Edits
                    </button>
                </form>
            </div>
        );
    }
}
ProfileEditForm.propTypes = {
     auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    profile: state.profile
  });


export default connect(mapStateToProps,{ getProfileComment,editComment })(withRouter(ProfileEditForm));