import React, { useEffect } from 'react';
import Register from '../../components/auth/Register';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';


const RegisterPage = () => {
    useEffect( () => {
        document.title = 'Register Page for | CraveJs'
    },[])
        return (
            <Layout>
                <Register/>
            </Layout>
        );
    
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(RegisterPage);