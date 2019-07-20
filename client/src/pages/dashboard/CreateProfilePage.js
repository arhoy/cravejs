
import React from 'react';
import { connect } from 'react-redux';
import CreateProfile from '../../components/create-profile/CreateProfile';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/links/mainLinks';



const CreateProfilePage = () => {
    const links = mainLinks(null, null);
    return (
        <Layout links = { links }>
        <CreateProfile/>
         </Layout>
    );
};



export default connect()(CreateProfilePage);