import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProductDetail from '../../components/products/ProductDetail';
import Layout from '../../components/Layout/Layout';




const ProductsPage = () => {    
        useEffect( ()=> {
            document.title = 'Products Page'
        },[])
        return (
            <Layout>
                <ProductDetail />
            </Layout>

           
        );
    
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProductsPage);