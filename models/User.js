const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        password: {
          type: String,
          required: true
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        },
        cart: {
          items: [
            {
                productId: {
                  type: Schema.Types.ObjectId,
                  ref: 'Product',
                  required: true
                },
                quantity: { type: Number, required: true }
            }
          ]
        },
        history:{
          type:Array,
          default: []
        },
        role: {
          type: Number,
          default: 0
        }
});

// *** METHODS ON USER SCHEMA ***//

// adds specific item to cart
UserSchema.methods.addToCart = function(product) {
      // returns productIndex inside the user cart, if not found -1.
      const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
      });

      let newQuantity = 1;
      // clone cart items array since we are going to modify it.
      const updatedCartItems = [...this.cart.items];

      // user already has this product. Increase quantity.
      if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      } else { // add the new item
        updatedCartItems.push({
          productId: product._id,
          quantity: newQuantity
        });
      }
      const updatedCart = {
        items: updatedCartItems
      };
      // update and save.
      this.cart = updatedCart;
      return this.save();
};

// removes specific item from cart
UserSchema.methods.removeFromCart = function(productId){
   const updatedCartItems = this.cart.items.filter( item => item.productId.toString() !== productId.toString())

  this.cart.items = updatedCartItems;
  return this.save();
}
// removes all items from the cart
UserSchema.methods.removeAllFromCart = function(){
  const updatedCartItems = this.cart.items.filter( item => item.productId.toString() === -1 )
  this.cart.items = updatedCartItems;
  return this.save();
}

module.exports = User = mongoose.model('users', UserSchema);


