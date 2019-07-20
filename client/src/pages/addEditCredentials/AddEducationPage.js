import React, { useEffect, Fragment } from 'react';
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux';
import AddEducation from '../../components/add-credentials/AddEducation';

import Layout from '../../components/Layout/Layout';


const AddEducationPage = ({auth: {user: { name }}}) => { 

        useEffect ( ()=> {
            document.title = `Add Education Page for ${name}`;
        },[] )

        return (
            <Fragment>
                <Helmet>
                    <title> Add your education page | {name} </title>
                    <meta 
                        name="description" 
                        content=
                            "Add your education or update your education credentials in your profile" 
                    />
                </Helmet>
                <Layout>
                    <AddEducation/>
                </Layout>
            </Fragment>
        );
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AddEducationPage);