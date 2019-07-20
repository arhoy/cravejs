import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserOrderId from '../../components/order/UserOrderId';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/links/mainLinks';




class UserOrderPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
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