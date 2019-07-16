import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductDetail from '../../components/products/ProductDetail';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/Links/mainLinks';




class ProductsPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
        
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