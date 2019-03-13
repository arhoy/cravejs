import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class UserOrder extends Component {
    render() {
        const { orderDate,products,orderedBy, orderId, totalPrice, totalQuantity } = this.props;
        const numberOfProducts = products.length;
        return (
            <div className = "UserOrder">
                <div className="UserOrder__orderId"> OrderId: <Link to = {`/order/${orderId}`} >{orderId}</Link></div>
                <div className="UserOrder__orderDate">Order Date: {moment.utc(orderDate).local().format("MMMM Do YYYY, h:mm a")}  </div>
                <div className="UserOrder__products">Distinct Products Ordered: {numberOfProducts}</div>
                <div className="UserOrder__quantity">Total Quantity: {totalQuantity}</div>
                <div className="UserOrder__price">Total Price: USD ${totalPrice}</div>

                <div className="UserOrder__orderBy">Ordered By: <Link to = '/dashboard' >{orderedBy}</Link></div>
            </div>
        );
    }
}

export default UserOrder;