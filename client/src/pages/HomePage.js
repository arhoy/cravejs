import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import LandingHeader from '../components/landing/LandingHeader';
import Register from '../components/auth/Register';
import Footer from '../components/Layout/Footer';
import HeaderLogo from '../components/Layout/HeaderLogo';
import Navigation from '../components/Layout/Navigation';

class HomePage extends Component {
    render() {
        return (
                <React.Fragment>
                  <LandingHeader/>
                  <Navigation/>
                  <Register/>
                  <Footer/>
                </React.Fragment>
              
            
            
        );
    }
}

export default HomePage;