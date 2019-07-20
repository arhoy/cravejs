import React, { Component } from 'react';
import Register from '../../components/auth/Register';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';


class RegisterPage extends Component {
    render() {

        
        return (
            <Layout>
                <Register/>
            </Layout>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(RegisterPage);