import React, { Component } from 'react';
import Login from '../../components/auth/Login';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import mainLinks from '../../utils/Links/mainLinks';

class LoginPage extends Component {
    render() {
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
        
        return (
             <Layout links = {links}>
                <Login/>
            </Layout>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(LoginPage);