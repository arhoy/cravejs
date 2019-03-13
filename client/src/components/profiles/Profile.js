import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profileActions';
import Moment from 'react-moment';

import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileSkills from './ProfileSkills';
import ProfileGitHub from './ProfileGitHub';

class Profile extends Component {

    componentDidMount() {
        if( this.props.match.params.handle ) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
     }
    render() {
        
            const { profile, loading } = this.props.profile;
        
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
                if(Object.keys(profile).length > 0){
                  profileContent = (
                    <React.Fragment>
                        <div className="profile__welcome">
                              <h3 className = "heading-secondary"> { `${profile.user.name}'s profile `} </h3>
                              <div className = "profile__headline"> {profile.headline} </div>
                              
                        </div>

                        <div className="profile__details">
                           <div className="profile__detail">
                                <span className="profile__detail-1"> 
                                   Location: {' '}
                                </span>
                                <span className="profile__detail-2"> 
                                  {profile.location}
                                </span>    
                            </div>
                         
                            <div className="profile__detail">
                                <span className="profile__detail-1"> 
                                Career Status: {' '}
                                </span> 
                                <span className="profile__detail-2">
                                  {profile.status}
                                </span> 
                            </div>
                            <div className="profile__detail">
                                <span className="profile__detail-1"> 
                                   Current Company: {' '}
                                </span>
                                <span className="profile__detail-2"> 
                                  {profile.company}
                                </span>    
                            </div>
                         
                            <div className="profile__detail" style = {{marginBottom: '1rem'}}>
                                 <span className="profile__detail-1"> 
                                   My short bio: {' '}
                                 </span>
                                 <div className="profile__detail-2"> 
                                  { profile.bio ? profile.bio : 'No bio yet!' }
                                 </div> 
                            </div>

                                                   
                        </div>

                      
                        <div className="profile__skills">
                            <h4 className = "heading-secondary heading-secondary--white" style = {{fontSize:'2.2rem'}}>Skills</h4>
                              <ProfileSkills skills = {profile.skills} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'1rem', marginTop:'3rem'}} />

                        <div className="profile__experience">
                            <h4 className = "heading-secondary heading-secondary--white" style = {{fontSize:'2.2rem'}}>Experience</h4>
                              <ProfileExperience experience = {profile.experience} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />

                        <div className="profile__education">
                              <h4 className = "heading-secondary heading-secondary--white" style = {{fontSize:'2.2rem'}}>Education</h4>
                              <ProfileEducation education = {profile.education} />
                        </div>
                        
                        
                        {
                            profile.githubusername ? 
                                <React.Fragment>
                                    <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />
                                    <div className="profile__github">
                                        <h4 className = "heading-secondary heading-secondary--white" style = {{fontSize:'2.2rem'}}>Git Repos</h4>
                                        <ProfileGitHub username = {profile.githubusername} />
                                    </div>
                                </React.Fragment>
                                : null
                              
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
          <section className="section-profile">
            <div className="profile">
               {profileContent}
            </div>
          </section>
        );
    }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors:state.errors
});

export default connect(mapStateToProps, { getProfileByHandle })(withRouter(Profile) );
