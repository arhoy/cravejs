const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PortfolioSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    url:{
        type:String,
        required:true
    },
    displayUrl:{
        type:String,
        required:true,
    },
    description: {
        type:String,
        maxlength: 50,
        minlength: 20
    },
    lastUpdated:{
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type:String
    },
    live:{
        type: Boolean,
        default: true
    }
});

module.exports = Portfolio = mongoose.model('Portfolio',PortfolioSchema)