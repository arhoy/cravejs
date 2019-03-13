import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Moment from 'react-moment';
import Experience from './Experience';
import Education from './Education';
import Posts from '../posts/Posts';
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
                        <div className="dashboard__welcome">
                              <h3 className = "heading-secondary"> Your Dashboard </h3>
                              <div className = "dashboard__user"> { `${displayName}'s profile `} </div>
                              <div className="dashboard__links">
                                    <ul>
                                      <li> <Link className = "dashboard__link" to = "edit-profile">Edit Profile</Link> </li>
                                      <li> <Link className = "dashboard__link" to = "add-experience"> Add Experience</Link> </li>
                                      <li> <Link className = "dashboard__link" to = "add-education"> Add Education</Link> </li>
                                    </ul>
                            </div>
                        </div>

                        <div className="dashboard__details">
                            <div className="dashboard__detail">
                                <span className="dashboard__detail-1"> 
                                  Join Date: {' '}
                                </span> 
                                <span className="dashboard__detail-2">
                                 <Moment format = "MMM YYYY">{profile.date}</Moment>
                                </span> 
                            </div>
                            <div className="dashboard__detail">
                                <span className="dashboard__detail-1"> 
                                Career Status: {' '}
                                </span> 
                                <span className="dashboard__detail-2">
                                  {profile.status}
                                </span> 
                            </div>
                            <div className="dashboard__detail">
                                <span className="dashboard__detail-1"> 
                                   Current Company: {' '}
                                </span>
                                <span className="dashboard__detail-2"> 
                                  {profile.company}
                                </span>    
                            </div>
                            <div className="dashboard__detail" style = {{marginBottom: '1rem'}}>
                                 <span className="dashboard__detail-1"> 
                                   My short bio: {' '}
                                 </span>
                                 <div className="dashboard__detail-2"> 
                                  { profile.bio ? profile.bio : 'No bio yet!' }
                                 </div> 
                            </div>

                          <Link className = "btn-2 btn--blue" to = {`/profile/${profile.handle}`}> View Public Profile </Link>
                         
                           
                        </div>

                      

                        <div className="dashboard__experience">
                              <Experience experience = {profile.experience} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />

                        <div className="dashboard__education">
                              <Education education = {profile.education} />
                        </div>

                        <div style = {{borderBottom: '2px solid black', marginBottom:'2rem'}} />

                    
                        <button className = "btn btn-2 btn--blue" onClick = {this.deleteAccountHandler}>Delete Account</button>
                   
                    </React.Fragment>
                  )
              }

                else{
                  
                    dashboardContent = (
                        <div className="dashboard__welcome">
                          <h4 className = "heading-secondary heading-secondary--blue"> Your Dashboard </h4>
                         
                          <div className = "dashboard__user"> { `${displayName}'s profile `} </div>
                          <div className="dashboard__getStarted">
                              <p style = {{marginBottom: '2rem'}}>Looks like you have not yet created a profile. Let's get started! </p>

                              <Link className = "btn btn--primary" to = "/create-profile"> Create Profile </Link>
                          </div>
                      </div>
                    )
                }
            }

            
      
        return (
          <section className="section-dashboard">
            <div className="dashboard">
               {dashboardContent}
            </div>
          </section>
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
