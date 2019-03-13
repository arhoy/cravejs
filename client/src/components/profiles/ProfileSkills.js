import React, { Component } from 'react';
import moment from 'moment';

class ProfileSkills extends Component {
    render() {

         const skills = this.props.skills.map( (skill, i) =>(

            <div className = "ProfileCredential__items ProfileCredential__items-skills" key = {i}>
                <div className = "ProfileCredential__item-skills">
                    { skill }
                </div>          
            </div>
        ));
        return (
            <div className = "ProfileCredential ProfileCredential-skills">
                {skills}
            </div>
        );
    }
}

export default ProfileSkills;