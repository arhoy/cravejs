import React, { Component } from 'react';
import Header from '../../components/Layout/Header';
import { connect } from 'react-redux';
import ThankYou from '../../components/thankyou/ThankYou';
import Footer from '../../components/Layout/Footer';





class ThankYouPage extends Component {    
    render() {
        console.log(this.props);
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
            <React.Fragment>
                <Header links = {links}/>
                <div className = "thankyou-container">
                    <ThankYou/>
                </div>
                <Footer/>

            </React.Fragment>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
})

export default connect(mapStateToProps)(ThankYouPage);