import React, { Component, Fragment } from 'react';

import { Helmet } from 'react-helmet'

import { connect } from 'react-redux';

import Developers from '../../components/developers/Developers';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/links/mainLinks';


class DevelopersPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
        
        return (
            <Fragment>
                <Helmet>
                    <title> List of Developers | Cravejs </title>
                    <meta 
                        name="description" 
                        content=
                            "List of developers on cravejs, search for profiles" 
                    />
                </Helmet>
                <Layout links = {links}>
                    <Developers/>
                </Layout>
            </Fragment>           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(DevelopersPage);