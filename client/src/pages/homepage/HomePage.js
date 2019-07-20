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
    state = {
        pageYOffset: 0,
        homeAboutDOMOffset:0
    }

    componentDidMount() {
        document.title = `CraveJs - free online learning resource for React fullstack development`
        window.addEventListener('scroll', this.hasScrolled);
        const homeAboutDOM = this.refs.homeAboutContainer;
        const homeAboutDOMOffset = homeAboutDOM.offsetHeight;
        this.setState({homeAboutDOMOffset})
     }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.hasScrolled);
    }
    hasScrolled = () => {
       this.setState({pageYOffset: window.pageYOffset});
    }
    render() {

        const { pageYOffset, homeAboutDOMOffset } = this.state;
        return (
                <>
                  <LandingHeader href = "#register_section" pageYOffset = {pageYOffset}/>
                  <Navigation/>
                  <HomeGallerySection/>
                  <div ref = "homeAboutContainer">
                     <HomeAbout
                         pageYOffset = {pageYOffset} 
                         homeAboutDOMOffset = {homeAboutDOMOffset}
                         windowHeight = {window.innerHeight}
                     />
                  </div>
                
                  <HomeServices/>
                  <Register />
                  <Footer/>

                  <ScrollableAnchor id={'register_section'}>
                 <div></div>
                </ScrollableAnchor>
                </>
              
            
            
        );
    }
}

export default HomePage;