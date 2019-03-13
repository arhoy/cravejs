import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserCart,getCurrentCartTotal,clearUserCart } from '../../actions/cartActions';
import { submitOrder } from '../../actions/orderActions';
import CartItems from './CartItems';
import PayPal from '../utils/PayPal';
import LoadingSpinner from '../utils/LoadingSpinner';
import isEmpty from '../../validation/is-empty';


class Cart extends Component {
    state = {
        cart: [],
        cartTotal: null,
        cartQuantity:null,
        loading:true
    }
    componentDidMount() {
         this.props.getUserCart();
         this.props.getCurrentCartTotal();
    }
    componentDidUpdate(prevProps, prevState) {
        const {cart} = this.props;
        const { cartTotal } = this.props.cart;
        if(prevProps.cart !== this.props.cart && this.props.cart.cart.length >= 0){
            this.setState({
                cart: cart.cart,
                loading:cart.loading,
                cartTotal: cartTotal.cartTotal,
                cartQuantity:cartTotal.cartQuantity
            })
        }
    }
    transactionSuccessHandler = (data) => {
        // on success call the orders backend api, store order via mongoose.
        this.props.submitOrder(data);

        // clear the user cart...
        this.props.clearUserCart();

        // push to thank you page
        this.props.history.push('thank-you');

    }
    transactionCanceledHandler = () => {
        console.log('user canceled transaction');
    }
    transactionErrorHandler = () => {
        console.log('Paypal error');
    }
    
    
    render() {
        
      const { cart, loading, cartTotal, cartQuantity } = this.state;
        if(loading || isEmpty(cartTotal) ) {
            return (
                <div className = "Cart">
                        <div className = "Cart__loading">
                                <div>Cart is loading</div>
                                <div>Please refresh page if loading persists</div> 
                                <LoadingSpinner/> 
                        </div>
                </div>
            )
        }
        if(cart.length === 0 && !loading){
            return (
                <div className = "Cart">
                    <div className="Cart__empty">
                        <div className="Cart__empty-block Cart__empty-block--1">
                            <div>Your Cart is Empty!</div>
                            <div>
                                <Link 
                                    className = "navigation__link" 
                                    to = "/products"
                                    style = {{textDecoration:'underline'}}
                                >
                                    Search for Products
                                </Link>
                            </div>
                        </div>

                        <div className="Cart__empty-block Cart__empty-block--2">
                        <div>Your Order History</div>
                            <div>
                                <Link 
                                    className = "navigation__link" 
                                    to = "/orders"
                                    style = {{textDecoration:'underline'}}
                                >
                                    View Order History
                                </Link>
                            </div>
                        </div>
                    
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className = "Cart">
                    <div className="Cart__header">
                                Shopping Cart
                    </div>
    
                    {
                        cart.length > 0 ? 
    
                        <div className="Cart__body">
                                <div className="Cart__body-1">
                                    Items in your cart { cartQuantity}
                                </div>
                                <div className="Cart__body-2">
                                    <CartItems cart = {cart} />
                                </div>
    
                                <div className="Cart__body-3">
                                  
                                    <div className = "Cart__total">Total Amount: 
                                        <span>
                                        {` $${ this.state.cartTotal.toFixed(2)  }`}
                                        </span>
                                    </div>
                                    <button className="Cart__paypal">
                                        <PayPal
                                            toPay = {cartTotal}
                                            transactionError = { this.transactionErrorHandler }
                                            transactionCanceled = { this.transactionCanceledHandler }
                                            transactionSuccess = { this.transactionSuccessHandler }
                                        />
                                    </button>
                                </div>
                        </div>
                        : 
                        null
                    }
    
                </div>
            );
        }  
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    cart:state.cart
})

export default connect(mapStateToProps, {getUserCart, getCurrentCartTotal, submitOrder,clearUserCart})(withRouter(Cart));