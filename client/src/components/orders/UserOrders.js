import React, { Component } from 'react';
import UserOrder from './UserOrder';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orderActions';
import LoadingSpinner from '../utils/LoadingSpinner';


class UserOrders extends Component {
    state = {
        filteredOrders: [],
        keyword: '',
        orders: []
    }
    

    componentDidMount() {
        this.props.getOrders();
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.order !== this.props.order){
            this.setState({orders: this.props.order.orders})
        }
      
    }
    inputChangeHandler = (e) => {
        const keyword = e.target.value;
        const filteredOrders = this.state.orders.filter(order => (
            order._id.toLowerCase().includes(keyword.toLowerCase().trim()) ||
            order.user.name.toLowerCase().includes(keyword.toLowerCase().trim())

        ))
        this.setState({filteredOrders,keyword});
    }

    
    
    render() {
        const {orders, filteredOrders,keyword} = this.state;
        console.log(orders);
 
        if( !orders || orders.length < 1 ) {
            return (
                <div className = "orders__loading">
                    <div>
                        Loading Orders
                    </div>
                    <div>Try reloading page if loading persists...</div>
                    <LoadingSpinner/>
                </div>
            ) 
        }
        else {
            const ordersToLoop = keyword === '' ? orders : filteredOrders
            return (
                <React.Fragment>
                    <input onChange = { this.inputChangeHandler } className = "orders__input" type="text" placeholder = "Search for orders"/>
                    <div className = "orders">
                    {
                        this.state.keyword !== '' && this.state.filteredOrders.length === 0 ? 
                            <div className = "orders__noResults"> Sorry, no results found!  </div>
                        :
                        ordersToLoop.map(order=>(
                            <UserOrder
                               key = {order._id}
                               orderId = {order._id}
                               orderDate = {order.orderDate}
                               products = {order.products}
                               orderedBy = {order.user.name}
                               totalPrice = {order.totalPrice}
                               totalQuantity = {order.totalQuantity}
                            />
                        ))
                    }
                    </div>
                </React.Fragment>
               
            );
        }
       
    }
}

const mapStateToProps = state => ({
    order: state.order
})
export default connect(mapStateToProps , { getOrders })(UserOrders);