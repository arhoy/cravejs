import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderLogo from '../layout/HeaderLogo';

class Header extends Component {
    render() {
        return (
            <div className="landingheader">
                <HeaderLogo/>
                <div className="landingheader__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">Crave JS</span>
                        <span className="heading-primary--sub">Awesome Resume App</span>
                    </h1>
                    <Link to = "/register" className = "btn btn--white btn--animated" > Sign Up </Link>
                </div>
            </div>
            
        );
    }
}

export default Header;