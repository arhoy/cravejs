import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserOrders from '../../components/orders/UserOrders';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/Links/mainLinks';




class UserOrdersPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);

        return (
        
               <Layout links = {links}>
                    <UserOrders/>
              </Layout>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(UserOrdersPage);