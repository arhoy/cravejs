import React, { Component } from 'react';
import { Link ,withRouter } from 'react-router-dom';

class Product extends Component {

 
    showDetailsHandler = (id) => {
        this.props.history.push(`/products/${id}`);
    
    }
    render() {
        const { name, description, imageUrl, price, longDescription, id } = this.props;
        const defaultImage = 'https://picsum.photos/400/200';

        return (
            <div className = "Product" onClick = { this.showDetailsHandler.bind(this,id) }>
                <figure className = "Product__figure">
                      <img className = "Product__image"src={imageUrl === '' ? defaultImage : imageUrl } alt={name}/>
                </figure>
                <div className="Product__name">  {name} </div>
                <div className="Product__price">  {`sale price `} <span>{`: $${price}`}</span>  </div>
                <div className="Product__description">  {description} </div>
      
                    <Link className = "Product__button link link__product" to = {`/products/${id}`} > 
                         Show Details
                     </Link>   
    
               
            </div>
        );
    }
}

export default withRouter(Product);