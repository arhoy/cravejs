import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Moment from 'react-moment';
import Experience from './Experience';
import Education from './Education';
import LoadingSpinner from '../utils/LoadingSpinner';


class Dashboard extends Component {


    componentDidMount() {
        this.props.getCurrentProfile();
     }

     deleteAccountHandler = () => {
      this.props.deleteAccount();
     }

    render() {

            const { user } = this.props.auth;
            const { profile, loading } = this.props.profile;
       
            let dashboardContent;
            if(profile == null || loading ){
              dashboardContent = ( 
                <React.Fragment>
                    <div className = "dashboard__loading">Loading Profile...</div>
                      <LoadingSpinner
                        bgColor = '#eee'
                      />
                </React.Fragment>
                 
              )
            }
            else {
              const displayName = user.name.split(' ')[0];

                if(Object.keys(profile).length > 0){
                  dashboardContent = (
                    <React.Fragment>
                        <div className="Dashboard__welcome">
                              <h3 className = "Dashboard__title"> Your Dashboard </h3>
                              <div className = "Dashboard__user"> { `${displayName}'s profile `} </div>
                              <div className="Dashboard__links">
                                    <ul>
                                      <li> <Link className = "Dashboard__link" to = "edit-profile">Edit Profile</Link> </li>
                                      <li> <Link className = "Dashboard__link" to = "add-experience"> Add Experience</Link> </li>
                                      <li> <Link className = "Dashboard__link" to = "add-education"> Add Education</Link> </li>
                                    </ul>
                            </div>
                        </div>
                      <div className = "Dashboard__summary">
                      <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Profile Snapshot</h4>
                          <div className="Dashboard__details">
                                <div className="Dashboard__detail">
                                    <span className="Dashboard__detail-1"> 
                                      Join Date: {' '}
                                    </span> 
                                    <span className="Dashboard__detail-2">
                                    <Moment format = "MMM YYYY">{profile.date}</Moment>
                                    </span> 
                                </div>
                                <div className="Dashboard__detail">
                                    <span className="Dashboard__detail-1"> 
                                    Career Status: {' '}
                                    </span> 
                                    <span className="Dashboard__detail-2">
                                      {profile.status}
                                    </span> 
                                </div>
                                <div className="Dashboard__detail">
                                    <span className="Dashboard__detail-1"> 
                                      Current Company: {' '}
                                    </span>
                                    <span className="Dashboard__detail-2"> 
                                      {profile.company}
                                    </span>    
                                </div>
                                <div className="Dashboard__detail" style = {{marginBottom: '1rem'}}>
                                    <span className="Dashboard__detail-1"> 
                                      My short bio: {' '}
                                    </span>
                                    <div className="Dashboard__detail-2"> 
                                      { profile.bio ? profile.bio : 'No bio yet!' }
                                    </div> 
                                </div>
                            </div>
                            <Link className = "Dashboard__viewProfileBtn btn-2 btn--blue" to = {`/profile/${profile.handle}`}> View Public Profile </Link>

                      </div>
                       

                      

                        <div className="Dashboard__experience">
                              <Experience experience = {profile.experience} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />

                        <div className="Dashboard__education">
                              <Education education = {profile.education} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />

                    
                        <button className = "btn btn-2 btn--blue" onClick = {this.deleteAccountHandler}>Delete Account</button>
                   
                    </React.Fragment>
                  )
              }

                else{
                  
                    dashboardContent = (
                        <div className="Dashboard__welcome">
                          <h4 className = "Dashboard__title"> Your Dashboard </h4>
                         
                          <div className = "Dashboard__user"> { `${displayName}'s profile `} </div>
                          <div className="Dashboard__getStarted">
                              <p style = {{marginBottom: '2rem'}}>Looks like you have not yet created a profile. Let's get started! </p>

                              <Link className = "btn btn--primary" to = "/create-profile"> Create Profile </Link>
                          </div>
                      </div>
                    )
                }
            }

            
      
        return (
            <div className="Dashboard">
               {dashboardContent}
            </div>
        );
    }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors:state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
