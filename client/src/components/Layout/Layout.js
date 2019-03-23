import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';
import { connect } from 'react-redux';


class Layout extends Component {
    
    render() {
        const {links} = this.props
        return (
                <div className = "layout">
                     <Header links = {links} />
                        {this.props.children}
                    <Footer/>
                </div>
             

        );
    }
}

Layout.defaultProps = {
    links :  [
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
  };

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(Layout);