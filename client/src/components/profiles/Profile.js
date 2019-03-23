import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByHandle,getProfileComments } from '../../actions/profileActions';

import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileSkills from './ProfileSkills';
import ProfileGitHub from './ProfileGitHub';
import ProfileCommentsForm from './ProfileCommentsForm';
import ProfileFeed from './ProfileFeed';

class Profile extends Component {

    componentDidMount() {
        if( this.props.match.params.handle ) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
  
     }
    render() {
        
            const { profile, loading } = this.props.profile;
            const { user } = this.props.auth;
        
            let profileContent;
            if(profile === null || loading ){
                if(loading) {
                    profileContent = (  <div className = "profile__loading">Loading Profile...</div>)
                } 
                else {
                    profileContent = (  <div className = "profile__notExist"> Profile does not exist...</div>)
                }
            }
            else {
                console.log(profile.comments);
                if(Object.keys(profile).length > 0){
                  profileContent = (
                    <React.Fragment>
                        <div className="profile__welcome">
                              <h3 className = "profile__title"> { `${user.name}'s profile `} </h3>
                              <div className = "profile__headline"> {profile.headline} </div>
                              
                        </div>

                        <div className="profile__details">
                            <div className="profile__detail">
                                    <div className="profile__detail-1"> 
                                    Location: {' '}
                                    </div>
                                    <div className="profile__detail-2"> 
                                    {profile.location}
                                    </div>    
                                </div>
                            
                                <div className="profile__detail">
                                    <div className="profile__detail-1"> 
                                    Career Status: {' '}
                                    </div> 
                                    <div className="profile__detail-2">
                                    {profile.status}
                                    </div> 
                                </div>
                                <div className="profile__detail">
                                    <div className="profile__detail-1"> 
                                    Current Company: {' '}
                                    </div>
                                    <div className="profile__detail-2"> 
                                    {profile.company}
                                    </div>    
                                </div>
                            
                                <div className="profile__detail" style = {{marginBottom: '1rem'}}>
                                    <div className="profile__detail-1"> 
                                    My short bio: {' '}
                                    </div>
                                    <div className="profile__detail-2"> 
                                    { profile.bio ? profile.bio : 'No bio yet!' }
                                    </div> 
                                </div>                        
                        </div>

                      
                        <div className="profile__skills">
                            <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Skills</h4>
                              <ProfileSkills skills = {profile.skills} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'1rem', marginTop:'3rem'}} />

                        <div className="profile__experience">
                            <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Experience</h4>
                              <ProfileExperience experience = {profile.experience} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />

                        <div className="profile__education">
                              <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Education</h4>
                              <ProfileEducation education = {profile.education} />
                        </div>
                        
                        
                        {
                            profile.githubusername ? 
                                <React.Fragment>
                                    <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />
                                    <div className="profile__github">
                                        <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Git Repos</h4>
                                        <ProfileGitHub username = {profile.githubusername} />
                                    </div>
                                </React.Fragment>
                                : null
                              
                        }
                        
                        {
                            profile.comments ? 
                            <React.Fragment>
                                <div style = {{borderBottom: '2px solid black', marginBottom:'1rem', marginTop:'3rem'}} />
                                <div className = "profile__comments">
                                    <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Comments</h4>
                                    <ProfileCommentsForm 
                                        backgroundColor = '#e8e8e8'
                                        placeholder = 'Add a comment'
                                        color = 'black'

                                    />
                                    <ProfileFeed backgroundColor = '#e8e8e8' comments = {profile.comments} showActions = {true} />
                                </div>
                            </React.Fragment>
                        
                            
                            :null
                        }
                        
                    </React.Fragment>
                  )
              }

                else{
                    profileContent = (
                        <div className="profile__welcome">
                          <h4 className = "heading-secondary heading-secondary--blue"> Your Profile </h4>
                         
                          <div className = "profile__user"> { `${profile.name}'s profile `} </div>
                          <div className="profile__getStarted">
                              <p style = {{marginBottom: '2rem'}}>Looks like you have not yet created a profile. Let's get started! </p>

                              <Link className = "btn btn--primary" to = "/create-profile"> Create Profile </Link>
                          </div>
                      </div>
                    )
                }
            }

            
      
        return (
       
            <div className="profile">
               {profileContent}
            </div>
        
        );
    }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors:state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle,getProfileComments })(withRouter(Profile) );
