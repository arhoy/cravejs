import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import { countryOptions } from './options/countryList';
import { statusOptions } from './options/statusList';
import FileUpload from '../utils/form/FileUpload';

class CreateProfile extends Component {
 
    state = {
      displaySocialInputs: false,
      displayPhotoUpload: false,
      handle: '',
      headline:'',
      company: '',
      website: '',
      city: '',
      country: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
      profilePhoto:'',
      submitPressed:false
    }

  componentDidMount() {
      this.props.getCurrentProfile();
   }

  static getDerivedStateFromProps (props, state) {
    if(props.errors !== state.errors) {
    return {errors: props.errors}
    }
    if(!isEmpty(props.profile.profile) ) {

      props.history.push('/edit-profile');
    }
    return null;
}

  onSubmitHandler(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      headline: this.state.headline,
      company: this.state.company,
      website: this.state.website,
      city: this.state.city,
      country: this.state.country,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      profilePhoto: this.state.profilePhoto
    };
    this.setState({submitPressed:true})
    this.props.createProfile(profileData, this.props.history);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const { errors, displaySocialInputs, suggestions, displayPhotoUpload } = this.state;
    console.log(errors);
    let socialInputs, photoUpload;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChangeHandler.bind(this)}
            error={errors.twitter}
            inputClassNames = "form__input form__input-sm form__input-white"
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChangeHandler.bind(this)}
            error={errors.facebook}
            inputClassNames = "form__input form__input-sm form__input-white"
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChangeHandler.bind(this)}
            error={errors.linkedin}
            inputClassNames = "form__input form__input-sm form__input-white"
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChangeHandler.bind(this)}
            error={errors.youtube}
            inputClassNames = "form__input form__input-sm form__input-white"
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChangeHandler.bind(this)}
            error={errors.instagram}
            inputClassNames = "form__input form__input-sm form__input-white"
          />

          
        </div>
      ); // end social inputs
    }

    if(displayPhotoUpload){
      photoUpload = (
          <FileUpload/>
      )
    }
   


   

    return (
          <div className="createProfile">
            <div className = "createProfile__header"> 

             <div>
             <Link className = "heading-secondary heading-secondary--blue" style = {{fontSize:'1.5rem'}} to = "/dashboard"> Back to Dashboard </Link> 
              </div>
              
              <h2 className = "heading-secondary" style = {{color:'#0C3953'}}>Create Your Profile</h2>
              <div> * is a required field</div>
            </div>
             
                <form className = "createProfile__form" onSubmit={this.onSubmitHandler.bind(this)}>
                  <TextFieldGroup
                    placeholder="* Your username/handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.handle}
                    info="A unique name for your profile *"
                  />
                  <SelectListGroup
                    name="status"
                    value={this.state.status}
                    onChange={this.onChangeHandler.bind(this)}
                    options={statusOptions}
                    error={errors.status}
                    info= {`What stage you're at in your career *`}
                  />
                   <TextAreaFieldGroup
                     placeholder="* Headline: i.e React developer at CraveJs"
                    name="headline"
                    value={this.state.headline}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.headline}
                    info="Insert attention grabbing headline *"
                    cols="90"
                    rows = "3"
                    showCharactersRemaining = {true}
                    maxLength = {100}
                    showOnLength = {10}
                  />
                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.company}
                    info="Your company or the one you work work"
                  />
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.website}
                    info="Your website or a company one"
                  />
      
                  <SelectListGroup
                    name="country"
                    value={this.state.country}
                    onChange={this.onChangeHandler.bind(this)}
                    options={countryOptions}
                    error={errors.country}
                    info="Your Country *"
                  />
             
             
                  <TextFieldGroup
                    placeholder="City"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.city}
                    info="Your City"
                  />

                  <TextFieldGroup
                    placeholder="* Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.skills}
                    info="Please use comma separated values (eg.
                      HTML,CSS,JavaScript,PHP) *"
                  />
                  <TextFieldGroup
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.githubusername}
                    info="If you want your latest repos and a Github link, include your username"
                  />
                  <TextAreaFieldGroup
                    placeholder="Short Summary of yourself"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChangeHandler.bind(this)}
                    error={errors.bio}
                    info="Tell us a little about yourself"
                    cols="90"
                    rows = "15"
                    showCharactersRemaining = {true}
                    maxLength = {500}
                    showOnLength = {250}
                  />

                  <div className="mb-3 createProfile__extras" >
                    <button
                      type="button"
                      ref = "socialmedia"
                      onClick={() => {
                        this.setState(prevState => ({
                          displaySocialInputs: !prevState.displaySocialInputs
                        }));
                      }}
                      className="btn btn-2 btn--secondary"
                    >
                      Add Social Network Links
                    </button>
                    <span style = {{marginLeft: '1rem',fontWeight:'600'}} className = "CreateProfile__options" >Optional</span>
                  </div>
                  {socialInputs}

                  <div className="mb-3 createProfile__extras">
                    <button
                      type="button"
                      ref = "photo"
                      onClick={() => {
                        this.setState(prevState => ({
                          displayPhotoUpload: !prevState.displayPhotoUpload
                        }));
                      }}
                      className="btn btn-2 btn--secondary"
                    >
                      Upload Photo
                    </button>
                    <span style = {{marginLeft: '1rem',fontWeight:'600'}} className = "CreateProfile__options" >Optional</span>
                  </div>
                  {photoUpload}

            
                  
                  <input
                    style = {{
                      marginTop: '1rem',
                      padding: '1.5rem 4rem'
              
                    }}
                    className="btn btn-2 btn--primary"
                    type="submit"
                    value="Submit"
                  />
                </form>
                    {
                      this.state.submitPressed && errors ? 
                        <div className = "createProfile__errors" >Please fix the errors above</div>
                      : null
                    }
               
        </div>
     
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
