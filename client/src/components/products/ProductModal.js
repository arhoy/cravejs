import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import PayPal from '../utils/PayPal';
import { submitOrder } from '../../actions/orderActions';
import { removeProductItemFromCart } from '../../actions/cartActions';
import { connect } from 'react-redux';

class ProductModal extends Component {
    componentDidMount() {
        console.log('ufkc youa')
    }
    
    toCartHandler = () => {
        this.props.history.push('/cart');
    }
    toProductsHandler = () => {
        this.props.history.push('/products');
    }

     // PayPal
     transactionErrorHandler = () => {
        console.log('transaction error');
    }
    transactionCanceledHandler = () => {
        console.log('transaction canceled');
    }
    transactionSuccessHandler = (data) => {
          // on success call the orders backend api, store order via mongoose.
          this.props.submitOrder(data);
          // remove productitem from cart
          this.props.removeProductItemFromCart(this.props.product._id);
          // push to thank you page
         this.props.history.push('/thank-you');
    }

    render() {
        const { product } = this.props;
        return (
            <div className = "ProductModal">
            <span className = "ProductModal__close"> 
                <FontAwesomeIcon
                    icon="times-circle"
                    style = {{color: 'black', cursor:'pointer'}}
                />
             </span>
                <div className="ProductModal__header">
                        <div className="ProductModal__header-1">
                             <span>Added </span> {product.name} to your cart!
                        </div>
                        <div className="ProductModal__header-2">
                            <button onClick = {this.toCartHandler} className = "ProductModal__button ProductModal__button-green">
                                Review Your Cart
                            </button>
                        </div>
                        
                </div>
                <div className="ProductModal__body">
                    Customers who bought <span>{product.name}</span>  also purchased ...
                </div>
                <div className="ProductModal__footer">
                    <div className="ProductModal__footer-1">
                            Browse More Products
                    </div>
                <div className="ProductModal__footer-2">
                    <button onClick = {this.toProductsHandler} className = "ProductModal__button ProductModal__button-blue">
                             View Products
                    </button> 
                </div>
                   
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    cart:state.cart,
    products: state.products


})

export default connect(mapStateToProps,{submitOrder,removeProductItemFromCart})(withRouter(ProductModal));