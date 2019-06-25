import React, { Component } from 'react';
import AddExperience from '../../components/add-credentials/AddExperience';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

class AddExperiencePage extends Component {    
    componentDidMount() {
        document.title = `Add Experience Page for ${this.props.auth.user.name}`;
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