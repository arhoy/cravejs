import React, { Component } from 'react';
import Logo from '../utils/Logo';
import { Link } from 'react-router-dom';

class HeaderLogo extends Component {
    render() {
        return (
            <div className="landingheader__logo-box">
                 <Link to = "/"> <Logo/> </Link> 
            </div>
        );
    }
}

export default HeaderLogo;