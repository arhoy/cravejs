
import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import CreateProfile from '../../components/create-profile/CreateProfile';
import Layout from '../../components/Layout/Layout';

const CreateProfilePage = () => {
   useEffect( () => {
        document.title = 'Create your Profile | CraveJs';
   },[])
    return (
        <Layout>
            <CreateProfile/>
         </Layout>
    );
};

export default connect()(CreateProfilePage);