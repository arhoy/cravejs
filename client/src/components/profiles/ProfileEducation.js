import React, { Component } from 'react';
import moment from 'moment';

class ProfileEducation extends Component {
    render() {

         const education = this.props.education.map(edu=>(
            <div className = "ProfileCredential__items" key = {edu._id}>
                <div className = "ProfileCredential__item" style = {{fontSize: '2rem'}}>{edu.school}</div>
                <div className = "ProfileCredential__item"> { edu.degree }, {edu.fieldofstudy}  </div>
                <div className = "ProfileCredential__item"> 
                        { `${moment.utc(edu.from).format("MMM YYYY")} - ` }
                        {edu.to === null ? (
                            <span>
                                Present
                            </span>
                            
                        ) : (
                            <span>
                            { ` ${moment.utc(edu.to).format("MMM YYYY")}` }  
                            </span>
                        )}
                </div>
                <div className = "ProfileCredential__item" style = {{paddingTop: '1rem'}}> 
                  <div className = "ProfileCredential__item-d"> Highlights: </div> 
                  { edu.description }  
                 </div>
            
            
               
              
            </div>
        ));
        return (
            <div className = "ProfileCredential">
                {education}
            </div>
        );
    }
}

export default ProfileEducation;