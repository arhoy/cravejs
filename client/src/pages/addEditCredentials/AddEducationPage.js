import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux';
import AddEducation from '../../components/add-credentials/AddEducation';

import Layout from '../../components/Layout/Layout';

class AddEducationPage extends Component { 

  
    componentDidMount() {
        document.title = `Add Education Page for ${this.props.auth.user.name}`;
    }   
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