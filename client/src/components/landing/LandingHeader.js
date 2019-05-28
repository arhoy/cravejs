import React, { Component } from 'react';

import HeaderLogo from '../Layout/HeaderLogo';

class LandingHeader extends Component {

    render() {
        const { pageYOffset } = this.props;

        return (
            <div className="landingheader">
                <HeaderLogo/>

                <div className="landingheader__text-box">
                    <h1
                     style = {{transform: `translate(0px, ${pageYOffset/1.2}px)`}} 
                     className="heading-primary"
                    >
                        <span className="heading-primary--main">Crave JS</span>
                        <span className="heading-primary--sub">Learn. Teach. Grow. Network.</span>
                    </h1>
                    <div
                        style = {{transform: `translate(0px, ${-pageYOffset/10}px)`}} 
                    >
                        <a 
                            href = {this.props.href}  
                            className = "btn btn--white btn--animated"    
                            
                        > 
                            Sign Up 
                        </a>
                    </div>
                 
                </div>

            </div>
            
        );
    }
}

export default LandingHeader;