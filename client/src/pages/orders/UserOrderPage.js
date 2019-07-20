import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserOrderId from '../../components/order/UserOrderId';
import Layout from '../../components/Layout/Layout';


const UserOrderPage = () =>  {    
    useEffect( () => {
        document.title = 'Order Page | CraveJs'
    },[])
        return (
            <Layout>
               <UserOrderId/>
            </Layout>
           
        );    
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(UserOrderPage);