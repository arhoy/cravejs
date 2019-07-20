import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserOrders from '../../components/orders/UserOrders'
import Layout from '../../components/Layout/Layout';


const UserOrderPage = () =>  {    
    useEffect( () => {
        document.title = 'Order Page | CraveJs'
    },[])
        return (
            <Layout>
               <UserOrders/>
            </Layout>
           
        );    
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(UserOrderPage);