import React, { Component } from 'react';
import Navigation from './Navigation';
import HeaderLogo from './HeaderLogo';

class Layout extends Component {
    render() {
        return (
                <div className = "layout">
                     <Navigation/>
                    <HeaderLogo/>
                 {this.props.children}
                </div>
             

        );
    }
}

export default Layout;