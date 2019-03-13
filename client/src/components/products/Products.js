import React, { Component } from 'react';
import Product from './Product';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import LoadingSpinner from '../utils/LoadingSpinner';


class Products extends Component {
    state = {
        filteredProducts: [],
        keyword: '',
        products: []

    }
    componentDidMount() {
        this.props.getProducts();
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.products !== this.props.products){
            this.setState({products: this.props.products.products})
        }
      
    }
    inputChangeHandler = (e) => {
        const keyword = e.target.value;
        const filteredProducts = this.state.products.filter(product => (
            product.name.toLowerCase().includes(keyword.toLowerCase().trim()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase().trim())

        ))
        this.setState({filteredProducts,keyword});
    }
    
    
    render() {
     
        const { products,filteredProducts } = this.state;
        if( !products || products.length < 1 ) {
            return (
                <div className = "products__loading">
                    <div>
                        Loading Products
                    </div>
                    <div>Try reloading page if loading persists...</div>
                    <LoadingSpinner/>
                </div>
            ) 
        }
        else {
            const productsToLoop = this.state.keyword === '' ? products : filteredProducts
            return (
                <React.Fragment>
                    <input onChange = { this.inputChangeHandler } className = "products__input" type="text" placeholder = "Search for products"/>
                    <div className = "products">
                    {
                        this.state.keyword !== '' && this.state.filteredProducts.length === 0 ? 
                            <div className = "products__noResults"> Sorry, no results found!  </div>
                        :
                        productsToLoop.map(product=>(
                            <Product
                                key = {product._id}
                                id = {product._id}
                                name = {product.name}
                                description = {product.description}
                                longDescription = {product.longDescription}
                                imageUrl = {product.imageUrl}
                                price = {product.price}
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
    products: state.products
})
export default connect(mapStateToProps , { getProducts })(Products);