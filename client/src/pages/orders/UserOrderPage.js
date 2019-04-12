import React, { Component } from 'react';
import Products from '../../components/products/Products';
import Header from '../../components/Layout/Header';
import { connect } from 'react-redux';
import UserOrders from '../../components/orders/UserOrders';
import UserOrderId from '../../components/order/UserOrderId';
import Footer from '../../components/Layout/Footer';
import Layout from '../../components/Layout/Layout';




class UserOrderPage extends Component {    
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
               <UserOrderId/>
            </Layout>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(UserOrderPage);