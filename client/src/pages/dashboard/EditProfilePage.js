import React, { Component } from 'react';
import EditProfile from '../../components/edit-profile/EditProfile';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/Links/mainLinks';

class EditProfilePage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
        return (
            <Layout links = {links}>
             <EditProfile/>
            </Layout>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(EditProfilePage);