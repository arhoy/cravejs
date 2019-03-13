const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const isEmpty = require('../../validation/is-empty');
// require order model
const Order = require('../../models/Order');
const User = require('../../models/User');

// Type: POST
// Route: api/order/
// Desc: Will add the new order, ie. complete the order
// Access: Private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res) => {
    // passed paypal data object inside req.body.
    User.findById(req.user.id)
        .populate({
            path: 'cart.items.productId',
            model:'product' 
        })
        .then( user => {

            let total = 0;
            let quantity = 0;
              user.cart.items.forEach(item => {
                total += item.productId.price*item.quantity;
                quantity += item.quantity;
              });

            const products = user.cart.items.map( p => {
                return {
                    product: p.productId,
                    quantity: p.quantity
                }
            }); // array of products such that names match the orderSchema.
            // create new order instance as defined in the Order Schema.
            const order = new Order({
                user:{
                    name: req.user.name,
                    userId: req.user._id
                },
                products:products,
                totalPrice:total,
                totalQuantity:quantity,
                paypalPaymentId: req.body.paymentID || ''

            })
    
            order.save()
                .then(order => res.status(200).json(order))
                .catch( err => res.status(400).json({'msg':'Could not save the order',err}))
        })
        .catch(err => res.status(400).json({'msg':'There as an error to get user cart items',err}))
});


// Type: GET
// Route: api/order/fetchallorders
// Desc: Fetch all the completed orders in database
// Access: Private
// To do: Restrict access to admin user only
router.get('/fetchallorders', passport.authenticate('jwt',{session:false}), (req,res)=> {
    Order.find()
        .then(order => res.status(200).json(order))
        .catch(err => res.status(400).json({'msg':'Could not get orders'}))
})


// Type: GET
// Route: api/order/
// Desc: Fetch all the completed orders specific to the user.
// Access: Private
router.get('/', passport.authenticate('jwt',{session:false}), (req,res)=> {
   
    Order.find({'user.userId':req.user._id})
        .populate({
            path:'products.product',
            model:'product'
        })
        .sort({orderDate:-1})
        .then(order =>res.status(200).json(order))
    
        .catch( err => res.status(400).json({'msg':'Cannot find user or complete the request inside'}))
      
})

// Type: GET
// Route: api/order/id
// Desc: Fetch specified order ID for given user.
// Access: Private
router.get('/:id', passport.authenticate('jwt',{session:false}), (req,res)=> {
   
    // Order.find({'user.userId':req.user._id})
        // .populate({
        //     path:'products.product',
        //     model:'product'
        // })
        Order
            .findById(req.params.id)
            .populate({
                path:'products.product',
                model:'product'
            })
            .sort({orderDate:-1})
            .then(order => {
                /// check if userId and order userId match
                if( req.user.id.toString() === order.user.userId.toString() ){
                    
                    return res.status(200).json(order);
                }
                else {
                    return res.status(403).json({msg:'User not authorized'})
                }
          
            
            // Order.findById(req.params.id)
            // .then( res => res.status(200).json(order))
            // .catch( err => res.status(400).json({msg:'There was an error'}))
        })
        .catch( err => res.status(404).json({'msg':'Order ID not found'}))
      
})

module.exports = router;


