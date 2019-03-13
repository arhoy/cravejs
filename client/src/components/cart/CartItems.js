import React from 'react';
import CartItem from './CartItem';

const CartItems = ({cart}) => {


    return (
            <div className = "CartItems">
            {

                cart.map( item => (
                    <CartItem key = {item._id} item = {item} />
                ))

            }
               
            </div>
    );
};

export default CartItems;