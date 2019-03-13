import React, { Component } from 'react';
import Layout from '../components/layout/Layout';
import LandingHeader from '../components/landing/LandingHeader';
import Register from '../components/auth/Register';

class HomePage extends Component {
    render() {
        return (
            <Layout>
                <LandingHeader/>
                <Register/>
            </Layout>
            
        );
    }
}

export default HomePage;