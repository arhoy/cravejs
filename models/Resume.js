const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    name:{
        type:String
    },
    lastUpdated:{
        type: Date,
        default: Date.now
    },
    imageUrl:{
        type:String,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    }
});

module.exports = Resume = mongoose.model('resume',ResumeSchema);