import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct, addProductToCart } from '../../actions/productActions';
import { getUserCart } from '../../actions/cartActions';
import { Link, withRouter } from 'react-router-dom'; 
import { submitOrder } from '../../actions/orderActions';

import Modal from 'react-modal';
import LightboxExample from '../utils/LightBoxExample';
import ProductModal from './ProductModal';
import isEmpty from '../../validation/is-empty';
import LoadingSpinner from '../utils/LoadingSpinner';


const customStyles = {
    overlay:{
        backgroundColor:'rgba(30, 34, 36, 0.88)',
        zIndex                :'999'
    },
    content : {
      position              :'fixed',
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'rgba(255, 255, 255, 0.95)',
      width                 :'80%',
      zIndex                :'1000',
      overFlow              : 'scroll'
    }
  };



class ProductDetail extends Component {

    state = {
        modalIsOpen:false,
        showOptions:false,
        lightBoxIsOpen:false,
        photoIndex:0,
        images: [
            'https://res.cloudinary.com/dcb389szc/image/upload/v1552347370/cravejs/logo.png',
            'https://res.cloudinary.com/dcb389szc/image/upload/v1552347573/cravejs/paypal.png',
          ]
    }
    componentDidMount() {
        Modal.setAppElement('body');
        const { id } = this.props.match.params;
        this.props.getUserCart();
        if(id){
             this.props.getProduct(id);
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        const { product, loading } = this.props.products; // product object.
        // update the images if we are done loading and image has not yet been pushed to the state image array.
        if(!loading && !isEmpty(product) && this.state.images.length <=2){
        
            const images = [...this.state.images];
            images.unshift(product.imageUrl);
            this.setState({images})
        }
        
    }
    
    

    openModal = () => {
        this.setState({
            modalIsOpen:true
        })
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        
      }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            showOptions:false
        });
    }
    viewCartHandler = () => {
        this.props.history.push('/cart');
    }

    onViewImagesHandler = () => {
       
        this.setState({
            lightBoxIsOpen:true
        })
    }
    addToCartHandler = (id) => {
        this.props.addProductToCart(id);
        this.setState({modalIsOpen:true})
        
    }
    closeRequestHandler = () => {
        this.setState({ lightBoxIsOpen:false })
    }
    onMovePrevRequest= () => {
        this.setState({ photoIndex: (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length })
    } 

    onMoveNextRequest = () => {
        this.setState({ photoIndex: (this.state.photoIndex + 1) % this.state.images.length })
    } 

    render() {
        
        const { product, loading } = this.props.products; // product object.
        console.log(this.props.cart);
        if( loading || isEmpty(product) ) {
            return (
                <div className = "ProductDetail__loading">
                    <div>
                        Loading Product
                    </div>
                    <div>Try reloading page if loading persists...</div>
                    <LoadingSpinner/>
                 </div>
            )
        }

        else {
            return (

                <div className = "ProductDetail">
    
                                {
                                    this.state.modalIsOpen ? 
                                    <div>
                                           
                                            <Modal
                                            isOpen={this.state.modalIsOpen}
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            contentLabel="AddToCartModal"
                                            >
                                                <ProductModal product = {product}/>
                                            </Modal>
                                    </div>
                                    
                                    : null
                                }
     
    
                    <div className="ProductDetail__feature">
                        <div className="ProductDetail__name">  { product.name } </div>
                        <div className="ProductDetail__description">  { product.description } </div>
                        <div className="ProductDetail__price">  { product.price ? `Sale Price: $${product.price}` : null } </div>
                    </div>
    
                    <figure className="ProductDetail__figure"> 
                            <img onClick = {this.onViewImagesHandler} className = "ProductDetail__image" src = { product.imageUrl } alt = { product.name } /> 
                
                                <LightboxExample
                                    className = "ProductDetail__lightbox"
                                    isOpen = { this.state.lightBoxIsOpen }
                                    closeRequest = {this.closeRequestHandler}
                                    photoIndex = { this.state.photoIndex }
                                    lightBoxName = "Enlarge Image"
                                    onViewImages = { this.onViewImagesHandler } 
                                    images = {this.state.images}
                                    onMoveNextRequest = { this.onMoveNextRequest }
                                    onMovePrevRequest = { this.onMovePrevRequest }
                                />
                            
                    </figure>
                    
    
                    <div className="ProductDetail__details">
                         <div className="ProductDetail__longDescription"> 
                            
                            <div className="ProductDetail__longDescription-1">
                                 Course Description: 
                            </div>
                            <div className="ProductDetail__longDescription-2">
                                  { product.longDescription } 
                            </div>
            
                        </div>
                    </div>
                    
                    <div className="ProductDetail__cta">
                                <button onClick = {this.addToCartHandler.bind(this,product._id)} className="ProductDetail__cta-addToCart">
                                        Add To Cart
                                </button>
                                {
                                    
                                }
    
                                <button onClick = {this.viewCartHandler} className="ProductDetail__cta-addToCart">
                                        View Cart
                                </button>
    
                                
                                <div className="ProductDetail__cta-features">
                                        <ul>
                                            <li>
                                                Unlimited lifetime access
                                            </li>
                                            <li>
                                                Certificate of completion
                                            </li>
                                            <li>
                                                90 Day risk free purchase
                                            </li>
                                        </ul>   
                                </div>
                    </div>
    
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    products: state.products,
    cart:state.cart
})
export default connect(mapStateToProps , { getProduct, addProductToCart, submitOrder, getUserCart })(withRouter(ProductDetail) );