import React, { Component } from 'react';
import Profile from '../../components/profiles/Profile';
import Header from '../../components/Layout/Header';
import { connect } from 'react-redux';
import Footer from '../../components/Layout/Footer';

class ProfilePage extends Component {    
    render() {
        return (
            <>
                <Header/>
                <div className = "profile-container">
                    <Profile/>
                </div>
                <Footer/>
            </>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProfilePage);