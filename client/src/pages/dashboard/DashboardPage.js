import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'
import Dashboard from '../../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

class DashboardPage extends Component {    
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
            {
                title: 'Products',
                linkTo: '/products' 
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
                    title: 'Products',
                    linkTo: '/products' 
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
                    <title> Your Dashboard Page for Developers | Cravejs </title>
                    <meta 
                        name="description" 
                        content=
                            "This is your dashboard page where you can showcase your skill, experience and education on cravejs" 
                    />
                </Helmet>
                <Layout links = {links}>
                        <Dashboard/>
                </Layout>

            </Fragment>
            
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(DashboardPage);