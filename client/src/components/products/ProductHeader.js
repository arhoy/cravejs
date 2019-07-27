import React from 'react';


const ProductsHeader = ({inputChangeHandler}) => {
    return (
    
            <div className="products__header"> 
                <div className = "productsHeader__input">
                    <input onChange = { inputChangeHandler } className = "products__input" type="text" placeholder = "Search Products"/>
                </div>
                   
            </div>
    
    );
};

export default ProductsHeader;