import React, { useEffect } from 'react';
import Cart from '../../components/cart/Cart';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';





const CartPage = () =>  {    
        useEffect(()=> {
            document.title = 'This is the Cart page';
        },[])
        return (
             <Layout>
                  <Cart/>
            </Layout>
           
        );
    
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(CartPage);