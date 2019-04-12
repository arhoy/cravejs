import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductDetail from '../../components/products/ProductDetail';
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
                <ProductDetail />
            </Layout>

           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProductsPage);