import React, { Component } from 'react';

import LandingHeader from '../../components/landing/LandingHeader';
import Register from '../../components/auth/Register';
import Footer from '../../components/Layout/Footer';
import HomeGallerySection from './HomeGallerySection'
import Navigation from '../../components/Layout/Navigation';
import HomeAbout from './HomeAbout';

import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor'
import HomeServices from './HomeServices';
configureAnchors({scrollDuration: 800})

class HomePage extends Component {
    render() {
        return (
                <React.Fragment>
                  <LandingHeader href = "#register_section" />
                  <Navigation/>
                  <HomeGallerySection/>
                  <HomeAbout/>
                  <HomeServices/>
                  <Register />
                  <Footer/>
                  <ScrollableAnchor id={'register_section'}>
                 <div></div>
                </ScrollableAnchor>
                </React.Fragment>
              
            
            
        );
    }
}

export default HomePage;