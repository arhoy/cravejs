import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderLogo from '../Layout/HeaderLogo';

class LandingHeader extends Component {
    
    render() {
        return (
            <div className="landingheader">
                <HeaderLogo/>
                <div className="landingheader__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">Crave JS</span>
                        <span className="heading-primary--sub">Awesome Resume App</span>
                    </h1>
                    <a href = {this.props.href}  className = "btn btn--white btn--animated" > Sign Up </a>
                </div>
            </div>
            
        );
    }
}

export default LandingHeader;