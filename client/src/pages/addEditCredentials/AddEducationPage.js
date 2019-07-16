import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux';
import AddEducation from '../../components/add-credentials/AddEducation';

import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/Links/mainLinks';

class AddEducationPage extends Component { 

  
    componentDidMount() {
        document.title = `Add Education Page for ${this.props.auth.user.name}`;
    }   
    render() {
        
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
 
        return (
            <Fragment>
                <Helmet>
                    <title> Add experience page for {user.name} </title>
                    <meta 
                        name="description" 
                        content=
                            "This is the add experience page for cravejs. Add your web developer experience here and showcase your skills in web development." 
                    />
                </Helmet>
                <Layout links = {links}>
                    <AddEducation/>
                </Layout>
            </Fragment>
           
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AddEducationPage);