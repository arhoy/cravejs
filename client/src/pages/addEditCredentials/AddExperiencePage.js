import React, { Component } from 'react';
import AddExperience from '../../components/add-credentials/AddExperience';
import Header from '../../components/Layout/Header';
import { connect } from 'react-redux';
import Footer from '../../components/Layout/Footer';
import Layout from '../../components/Layout/Layout';

class AddExperiencePage extends Component {    
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
          
            <Layout links = {links}>
                 <AddExperience/>
            </Layout>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AddExperiencePage);