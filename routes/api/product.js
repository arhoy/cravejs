const express = require('express');
const router = express.Router();
const passport = require('passport');

const Product = require('../../models/Product');
const User = require('../../models/User');
const validateProductInput = require('../../validation/product');


// Type: POST
// Route: api/product/remove/:id
// Desc: Remove the item inside the cart of the User Object.
// Access: Private
router.post('/remove/:id', passport.authenticate('jwt', {session:false}),(req,res) => {
    Product.findById(req.params.id)
        .then( product => {
            return req.user.removeFromCart(product._id)
        })
        .then( result => res.status(200).json(result)) 
        .catch( err => res.status(400).json({'msg':'Cannot remove product item from user cart'}))
})

// Type: POST
// Route: api/product/remove
// Desc: Removes all the items from the user cart
// Access: Private
router.post('/remove', passport.authenticate('jwt', {session:false}),(req,res) => {
    User.findById(req.user.id)
        .then(user => req.user.removeAllFromCart())
        .then( () => res.status(200).json({'msg':'Your cart is empty!'}) )
        .catch( err => res.status(400).json({'msg':'Not authorized!'}))
})

// Type: POST
// Route: api/product
// Desc: Create product and add to the post db
// Access: Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res) => {

   const { errors, isValid } = validateProductInput(req.body);
   if(!isValid){
       return res.status(400).json(errors)
   }

   const newProduct = new Product({
       user:req.user.id,
       name: req.body.name,
       price: req.body.price,
       description: req.body.description,
       longDescription: req.body.longDescription,
       imageUrl: req.body.imageUrl,
       userId: req.user.id
   })
   newProduct
       .save()
       .then( post =>  res.status(200).json(post) )
       .catch(err => res.status(400).json({msg:`There was an error saving the new product ${err}`} ))   
})

// Type: GET
// Route: api/product
// Desc: Fetch array of products
// Access: Public
router.get('/', (req,res) => {
   Product.find()
  // .populate('userId')
       .then( post => res.status(200).json(post))
       .catch( err => res.status(400).json({msg: 'Could not fetch products'}))
})


// Type: GET
// Route: api/product
// Desc: Fetch specific product
// Access: Public
router.get('/:id', (req,res) => {
    Product.findById(req.params.id)
    // .populate('userId') 
        .then( post => res.status(200).json(post))
        .catch( err => res.status(400).json({msg: 'Could not fetch product requested'}))
 })

// Type: POST
// Route: api/product/add
// Desc: Update the cart
// Access: Private
router.post('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {

   const { errors, isValid } = validateProductInput(req.body);
   if(!isValid){
       return res.status(400).json(errors)
   }

   const productFields = {}
   productFields.id = req.user.id;
   if(req.body.name) productFields.name = req.body.name;
   if(req.body.description) productFields.description = req.body.description;
   if(req.body.longDescription) productFields.longDescription = req.body.longDescription;
   if(req.body.price) productFields.price = req.body.price;
   if(req.body.imageUrl) productFields.imageUrl = req.body.imageUrl;
  
   Product.findByIdAndUpdate(req.params.id, {$set: productFields},{new:true})
       .then(product => { res.status(200).json(product) })
       .catch( err => res.status(400).json({msg:`cannot get all products right now ${err}`}) );
})

// Type: POST
// Route: api/product/add/:id
// Desc: Update the cart inside of the User Object or add product to user cart.
// Returns: the product object.
// Access: Private
// Notes: No validation is required, req.body is empty since no form fields.
router.post('/add/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  
   Product.findById(req.params.id)
       .then(product => {
           return req.user.addToCart(product);
       })
       .then(result => {   // this is the result from addToCart user method
           return res.status(200).json(result);
         
       })
       .catch( () =>  res.status(400).json({'msg':'Cannot return result'}))

});



module.exports = router;

