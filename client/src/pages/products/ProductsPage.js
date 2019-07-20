import React, { Component } from 'react';
import Products from '../../components/products/Products';

import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

class ProductsPage extends Component {    
    render() {

        return (
            <Layout>
                <Products/>
            </Layout>           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProductsPage);