import React, { Component } from 'react';
import Products from '../../components/products/Products';

import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';




class ProductsPage extends Component {    
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
       

            <Layout links = {links}>
                  <Products
                  />
            </Layout>


           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProductsPage);