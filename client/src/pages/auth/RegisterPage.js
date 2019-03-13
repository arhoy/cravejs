import React, { Component } from 'react';
import Register from '../../components/auth/Register';
import Layout from '../../components/layout/Layout';

class RegisterPage extends Component {
    render() {
        return (
            <Layout>
                 <Register/>
            </Layout>
             
            
        );
    }
}

export default RegisterPage;