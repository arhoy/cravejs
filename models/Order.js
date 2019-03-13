const mongoose = require('mongoose');
const Schema = mongoose.Schema;
OrderSchema = new Schema({
    user:{
        name:{
            type:String,
            required:true
        },
        userId:{
            type: Schema.Types.ObjectId,
            required:true,
            ref: 'users'
        }
       
    },
    totalPrice: {
        type:Number,
        required:true
    },
    totalQuantity: {
        type:Number,
        required:true
    },
    paypalPaymentId:{
        type:String
    },
    products:[
        {
          product:{
            type: Object,
            required:true
          },
          quantity:{
              type:Number,
              required:true,
              min:1
          }  
        }
    ],
    orderDate:{
        type:Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('order',OrderSchema);
