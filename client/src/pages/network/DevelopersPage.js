import React, { Component, Fragment } from 'react';

import { Helmet } from 'react-helmet'

import { connect } from 'react-redux';

import Developers from '../../components/developers/Developers';
import Layout from '../../components/Layout/Layout';


class DevelopersPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        let links;
        if (!isAuthenticated) links = [
            {
                title: 'Login',
                linkTo: '/login' 
            },
            {
                title: 'Posts',
                linkTo: '/posts' 
            },
        ];
        else {
            links =  [
                {
                    title: `${user.name}`,
                    linkTo: `/dashboard` 
                },
                {
                    title: 'Dashboard',
                    linkTo: '/dashboard' 
                },
                {
                    title: 'Posts',
                    linkTo: '/posts' 
                },
                {
                    title: 'My Cart',
                    linkTo: '/cart' 
                },
                {
                    title: 'Logout',
                    linkTo: '/' 
                }
            ]
        }
        
       
 
        
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