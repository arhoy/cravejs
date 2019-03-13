import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeProductItemFromCart } from '../../actions/cartActions';

class CartItem extends Component {
    removeItemHandler = (id) => {
        this.props.removeProductItemFromCart(id);
    }
    render() {
        const { item } = this.props;
        return (
            <div className = "CartItem" key = { item._id } >
                        <div className="CartItem__name">{ item.productId.name }</div>
                        <div className="CartItem__price"> ${ item.productId.price }</div>
                        <div className="CartItem__quantity"> Quantity: { item.quantity } </div>
                        <span onClick = {this.removeItemHandler.bind(this,item.productId._id)} className="CartItem__remove"> Remove </span>
                        
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps,{ removeProductItemFromCart })(CartItem);