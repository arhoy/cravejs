import React, { useEffect } from 'react';
import Login from '../../components/auth/Login';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

const LoginPage = () => {   
        useEffect( () => {
            document.title = 'Login Page | CraveJs'
        },[] )
        return (
             <Layout>
                <Login/>
            </Layout>
        );
    }
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(LoginPage);