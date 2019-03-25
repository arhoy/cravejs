const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name : {
    type: Schema.Types.String,
    ref:'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  headline: {
    type: String,
    min: 10,
    max: 140,
    required:true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type:String,
    required:true
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String,
    max: 500
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments:[
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
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
