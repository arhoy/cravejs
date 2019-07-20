import React, { Component } from 'react';
import Register from '../../components/auth/Register';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import mainLinks from '../../utils/links/mainLinks';

class RegisterPage extends Component {
    render() {
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
        
        return (
            <Layout links = {links}>
                <Register/>
            </Layout>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(RegisterPage);