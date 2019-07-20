import React, { useEffect, Fragment } from 'react';
import AddExperience from '../../components/add-credentials/AddExperience';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import {Helmet} from 'react-helmet'

const AddExperiencePage = ({auth: {user: { name }}}) => {    

    useEffect(()=> {
        document.title = `Add work experience | ${name}`;
    },[] ) 
    
        return (
         
            <Fragment>
                <Helmet>
                    <title> Add professional work related experience | {name} </title>
                    <meta 
                        name="description" 
                        content=
                            "Add your professional work experience or update your work experience credentials in your profile" 
                    />
                </Helmet>
                <Layout>
                 <AddExperience/>
                </Layout>
            </Fragment>
        );
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AddExperiencePage);