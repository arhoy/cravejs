import React, { Component } from 'react';

import LandingHeader from '../../components/landing/LandingHeader';
import Register from '../../components/auth/Register';
import Footer from '../../components/Layout/Footer';
import HomeGallerySection from './HomeGallerySection'
import Navigation from '../../components/Layout/Navigation';
import HomeAbout from './HomeAbout';

class HomePage extends Component {
    render() {
        return (
                <React.Fragment>
                  <LandingHeader/>
                  <Navigation/>
                  <HomeGallerySection/>
                  <HomeAbout/>
                  <Register/>
                  <Footer/>
                </React.Fragment>
              
            
            
        );
    }
}

export default HomePage;