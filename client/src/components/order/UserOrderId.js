import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrder } from '../../actions/orderActions';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import moment from 'moment';
import LoadingSpinner from '../utils/LoadingSpinner';

class UserOrderId extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        if(id){
            this.props.getOrder(id);
        }
    }
    
    render() {
        const { order,loading } = this.props.order;
        const { products } = this.props.order.order;

        if(loading || isEmpty(products)) {
            return (
                <div className = "orders__loading">
                    <div>
                        Loading Order
                    </div>
                    <div>Try reloading page if loading persists...</div>
                    <LoadingSpinner/>
                </div>
            )
        } else {
            return (
                <div className = "UserOrderId">
                    <div className = "UserOrderId__main" >
                    <div style = {{fontSize: '2rem'}}> Purchase Summary </div>
                        <div className="UserOrderId__price">Order Id: {order._id}</div>
                        <div className="UserOrderId__price">Total Price: ${order.totalPrice}</div>
                        <div className="UserOrderId__quantity">Total Quantity: {order.totalQuantity}</div>
                        <div className="UserOrderId__orderDate">Order Date: {moment.utc(order.orderDate).local().format("MMMM Do YYYY, h:mm a")}</div>
                    </div>
                    
                 
                    <div className="UserOrderId__main">
                            <div style = {{fontSize: '2rem'}}> Products Purchased </div>
                            {
                                products.map(product => (
                                    <div key = {product.product._id} className="UserOrderId__product">
                                    <div className="UserOrderId__product-a">
                                        <div className="UserOrderId__product-1">{product.product.name}</div>
                                        <div className="UserOrderId__product-3">Product price: ${product.product.price}</div>
                                        <div className="UserOrderId__product-2">Quantity: {product.quantity}</div>
                                        <div className="UserOrderId__product-4"></div>
                                    </div>

                                    <figure className="UserOrderId__product-b">
                                            <img src= {product.product.imageUrl} alt={product.product.name}/>
                                    </figure>

                                        
                                    </div>
                                   
                                ))
                            }
                              
                    </div>
    
                </div>
            );   
        }
    }
}

const mapStateToProps = state => ({
    order: state.order
})

export default connect( mapStateToProps, { getOrder } )(withRouter(UserOrderId));