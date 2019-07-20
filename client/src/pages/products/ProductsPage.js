import React, { Component } from 'react';
import Products from '../../components/products/Products';

import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/links/mainLinks';




class ProductsPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
  
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