import React, { Component } from 'react';

import LandingHeader from '../components/landing/LandingHeader';
import Register from '../components/auth/Register';
import Footer from '../components/Layout/Footer';
import Gallery from '../components/galleries/Gallery';
import Navigation from '../components/Layout/Navigation';

class HomePage extends Component {
    render() {
        return (
                <React.Fragment>
                  <LandingHeader/>
                  <Navigation/>
                  <Gallery/>
                  <Register/>
                  <Footer/>
                </React.Fragment>
              
            
            
        );
    }
}

export default HomePage;