import React, { Component } from 'react';
import Profile from '../../components/profiles/Profile';
import Header from '../../components/Layout/Header';
import { connect } from 'react-redux';
import Footer from '../../components/Layout/Footer';
import mainLinks from '../../utils/Links/mainLinks';

class ProfilePage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
        return (
            <>
                <Header links = {links}/>
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