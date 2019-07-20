import React, { Component } from 'react';
import Login from '../../components/auth/Login';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

class LoginPage extends Component {
    render() {
    
        
        return (
             <Layout>
                <Login/>
            </Layout>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(LoginPage);