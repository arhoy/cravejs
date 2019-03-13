const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    replies:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                require:true
            },
            name:{
                type:String,
                require:true
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            },
            likes : [
                {
                    user:{
                        type: Schema.Types.ObjectId,
                        ref:'users'
                    }
                }
            ]
        }
    ]
});

module.exports = Post = mongoose.model('post',PostSchema)