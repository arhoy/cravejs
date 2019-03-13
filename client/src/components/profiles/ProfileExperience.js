import React, { Component } from 'react';
import moment from 'moment';

class ProfileExperience extends Component {
    render() {

         const experience = this.props.experience.map(exp=>(
            <div className = "ProfileCredential__items" key = {exp._id}>
            
                <div className = "ProfileCredential__item" style = {{fontSize: '2rem'}}>{exp.company}</div>
                <div className = "ProfileCredential__item"> { exp.title } </div>
                <div className = "ProfileCredential__item"> 
                        { `${moment.utc(exp.from).format("MMM YYYY")} - ` }
                        {exp.to === null ? (
                            <span>
                                Present
                            </span>
                            
                        ) : (
                            <span>
                            { ` ${moment.utc(exp.to).format("MMM YYYY")}` }  
                            </span>
                        )}
                </div>
                <div className = "ProfileCredential__item" style = {{paddingTop: '1rem'}}> 
                  <div className = "ProfileCredential__item-d"> Highlights: </div> 
                  { exp.description }  
                 </div>
            
            
               
              
            </div>
        ));
        return (
            <div className = "ProfileCredential">
                {experience}
            </div>
        );
    }
}

export default ProfileExperience;