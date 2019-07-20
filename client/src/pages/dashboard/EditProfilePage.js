import React, { useEffect } from 'react';
import EditProfile from '../../components/edit-profile/EditProfile';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

const EditProfilePage = ({auth: {user: { name }}}) => {    
        useEffect( () => {
            document.title = `Edit Profile Page | ${name} | CraveJs`
        },[])

        return (
            <Layout>
                 <EditProfile/>
            </Layout>
        );
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(EditProfilePage);