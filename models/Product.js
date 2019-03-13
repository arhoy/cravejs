const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    longDescription: {
        type:String
    },
    lastUpdated:{
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type:String
    }
    ,userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    }
});

module.exports = Product = mongoose.model('product',ProductSchema)