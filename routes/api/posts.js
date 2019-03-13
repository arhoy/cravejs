const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Bring in the Post and Profile Model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Load validation
const validatePostInput = require('../../validation/post');
const validateReplyInput = require('../../validation/reply');
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route POST api/posts
// @desc Create post and add to the post db
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res) => {

    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }

    const newPost = new Post({
        user:req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.user.avatar
    }) 
    newPost
        .save()
        .then( post =>  res.status(200).json(post) )
        .catch(err => res.status(400).json({msg:`There was an error saving the new post ${err}`} ))    
})


// @route Edit Post POST api/posts/id
// @access Private
router.post( '/:id',passport.authenticate('jwt', { session: false }),(req, res) => {

    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    
    // Get fields
    const postFields = {};
    postFields.id = req.params.id;
    postFields.user = req.user.id;
    if (req.body.text) postFields.text = req.body.text;
    if (req.body.name) postFields.name = req.body.name;
    if (req.user.avatar) postFields.avatar = req.user.avatar;
    console.log(req.params.id);
    
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            console.log(req.user.id);
            if(profile.user.toString() !== req.user.id){
                return res.status(401).json({msg:'Access denied, this user is not allowed to edit this post'});
            }
            if(req.params.id){ // pass this in for a new post.
                Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: postFields },
                    { new: true }
                )
                .then(post => res.json(post))
                .catch(err => res.status(400).json({msg:'Could not update the profile'}))
            }
          
            
    
    })
}); // router posts end






// @route GET api/posts
// @desc Get all the posts READ ONLY
// @access Public
router.get('/',(req,res)=>{
    Post
    .find()
    .sort({date: -1})
    .then( post => res.status(200).json(post) )
    .catch( err => res.status(400).json({msg:`cannot get all posts right now ${err}`}) );
})

// @route GET api/posts/stuff
// @desc Get specific post READ ONLY
// @access Pubic
// for testing only, only GET if req.query.category is react
router.get('/stuff',(req,res) => {
   // console.log(req.query);
    if(req.query.category === 'react'){
        Post
        .find()
        .sort({date: -1})
        .then( post => res.status(200).json(post) )
        .catch( err => res.status(400).json({msg:`cannot get all posts right now ${err}`}) );
    }
    else {
        res.status(404).json({msg:'Could not find React request mr AQUASAR'});
    }
    
})



// @route GET api/posts/latest
// @desc Get all the latest post READ ONLY
// @access Public
router.get('/latest',(req,res)=>{
    Post
    .find()
    .sort({date: -1})
    .then( post => res.status(200).json(post[0]) )
    .catch( err => res.status(400).json({msg:`cannot get all posts right now ${err}`}) );
})

// @route GET api/posts/first
// @desc Get all the first post READ ONLY
// @access Public
router.get('/first',(req,res)=>{
    Post
    .find()
    .sort({date: 1})
    .then( post => res.status(200).json(post[0]) )
    .catch( err => res.status(400).json({msg:`cannot get all posts right now ${err}`}) );
})


// @route GET api/posts
// @desc Get specific post READ ONLY
// @access Pubic
router.get('/:id',(req,res) => {
    Post
    .findById(req.params.id)
    .then( post => res.status(200).json(post) )
    .catch( err => res.status(404).json({msg:`cannot find this post! ${err}`}) );
})



// @route DELETE api/posts
// @routeNumber: delete_post_specific
// @desc Delete a post
// @access Private
router.delete('/:id',passport.authenticate('jwt',{session:false}), (req,res) => {
    Profile.findOne({user:req.user.id})
        .then(profile=>{
                Post.findById(req.params.id)
                    .then( post =>{
                        // check for the post owner
                        if(post.user.toString() !== req.user.id){
                            return res.status(401).json({msg:'not authorized is not valid: delete_post_specific'})
                        }
                        post.remove()
                            .then( () => res.status(200).json({msgSuccess:'Post deleted'}))
                            .catch(err=> res.status(404).json({msg:'There was an error, post not found'}))
                    })
                    .catch(err=> res.status(400).json({msg:'user not found on delete_specific_post'}))
        })
        .catch(err=> res.status(400).json({msg:'cannot delete specific post, post.js'}))
})



// @route POST api/post/like/:id
// @desc Like a post
// @access Private
router.post('/like/:id',passport.authenticate('jwt',{session:false}), (req,res) => {
        Profile.findOne({user:req.user.id})
            .then(profile =>{
                Post.findById(req.params.id)
                    .then(post => {
                        // handle the likes to a post.
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                            return res.status(400).json({alreadyLiked:'User has already liked this post!'})
                        }
                        // if user is not in likes array then add user...
                        post.likes.unshift({user:req.user.id});
                        post.save()
                            .then( like => res.json(like))
                            .catch(err => res.status(400).json({msg:'Error in saving post'}))
                    })
                    .catch(err=> res.status(404).json({postnotfound:'No post found'}));
            })
})

// @route POST api/posts/reply/like/:postId/:replyId
// @desc Like a reply to a post
// @access Private
router.post('/reply/like/:postId/:replyId',passport.authenticate('jwt',{session:false}), (req,res) => {
    Profile.findOne({user:req.user.id})
        .then(profile =>{
            console.log(req.params.postId);
            Post.findById(req.params.postId)
                .then(post =>{
                    if( post.replies.filter( reply => reply._id.toString() === req.params.replyId).length === 0 ) {
                        // reply does not exsist
                        return  res.status(404).json({replynotexist:'reply does not exist'});
                    }
                    else {
                        post.replies.forEach(reply => {
                            if(reply._id.toString() === req.params.replyId){
                                if (reply.likes.filter(like => like.user.toString() === req.user.id).length > 0 ){
                                        return res.status(400).json({'alreadyLiked':'User has alread liked this post reply'})
                                }
                                // user has not already like the reply, add to reply like array.
                                reply.likes.unshift({user:req.user.id})
                                post.save()
                                    .then(post=> res.status(200).json(post))
                                    .catch(err => res.status(400).json({msg:'Error in saving post reply like'}))
                            }
                        });
                    }
        
                })
                .catch(err=> res.status(404).json({postnotfound:'No post found'}));
        })
})

// @route POST api/posts/reply/unlike/:postId/:replyId
// @desc Like a reply to a post
// @access Private
router.post('/reply/unlike/:postId/:replyId',passport.authenticate('jwt',{session:false}), (req,res) => {
    Profile.findOne({user:req.user.id})
        .then(profile =>{
            console.log(req.params.postId);
            Post.findById(req.params.postId)
                .then(post =>{
                    if( post.replies.filter( reply => reply._id.toString() === req.params.replyId).length === 0 ) {
                        // reply does not exsist
                        return  res.status(404).json({replynotexist:'reply does not exist'});
                    }
                    else {
                        post.replies.forEach(reply => {
                            if(reply._id.toString() === req.params.replyId){
                                if (reply.likes.filter(like => like.user.toString() === req.user.id).length === 0 ){
                                        return res.status(400).json({'notLiked':'User has not liked this post reply yet'})
                                }
                                // user has already like the post and we can remove it.
                                const removeIndex = reply.likes.map(like => like.user.toString()).indexOf(req.user.id);
                                reply.likes.splice(removeIndex,1);
                                post.save()
                                    .then(post=> res.status(200).json(post))
                                    .catch(err => res.status(400).json({msg:'Error in saving post reply like'}))
                            }
                        });
                    }
        
                })
                .catch(err=> res.status(404).json({postnotfound:'No post found'}));
        })
})



// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post( '/unlike/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @Route GET api/post/reply
// @DESC Get all the replies for a given post id
// @auth required? NO

router.get('/reply/:id', (req,res) => {
    Post
        .findById(req.params.id)
        .then( post => res.status(200).json(post) )
        .catch( err => res.status(400).json({msg:`cannot get all posts right now ${err}`}) );
})

// @route POST api/post/reply/:id
// @desc Add a reply to a specific post post
// @access Private
router.post('/reply/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid} = validateReplyInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post =>{
            const newreply = {
                text:req.body.text,
                name:req.body.name,
                avatar:req.body.avatar,
                user:req.user.id
            }
            post.replies.unshift(newreply);
            post.save()
                .then( post => res.json(post))
                .catch(err => res.status(404).json({postnotfound:'Post not found'}) );
        })
        .catch(err=> res.status(404).json({postnotfound:'No post found'}));
})

// @route DELETE api/post/reply/:id
// @desc Remove a reply from post
// @access Private
// @url form reply/:postid/:reply_id
router.delete('/reply/:id/:reply_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Post.findById(req.params.id)
        .then(post =>{
           if( post.replies.filter( reply => reply._id.toString() === req.params.reply_id).length === 0 ) {
                // reply does not exsist
               return  res.status(404).json({replynotexist:'reply does not exist'});
           }

           const removeIndex = post.replies
                                    .map( item => item._id.toString() )
                                    .indexOf(req.params.reply_id);
                
            post.replies.splice(removeIndex,1);

            post.save()
                .then( post => res.json(post))
        })

        .catch(err=> res.status(404).json({postnotfound:'No post found'}));
})



// @route ADD and save changes... Edit Post reply POST api/posts/reply/:postId/:replyId
// @access Private
router.post( '/reply/:postId/:replyId',passport.authenticate('jwt', { session: false }),(req, res) => {

    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
   
    // Get fields
    const replyFields = {};
 
    replyFields.user = req.user.id;
    if (req.body.text) replyFields.text = req.body.text;
    if (req.body.name) replyFields.name = req.body.name;
    if (req.user.avatar) replyFields.avatar = req.user.avatar;
  
    
    Profile.findOne({ user: req.user.id })
        .then(profile => {
          
            if(profile.user.toString() !== req.user.id){
                return res.status(401).json({msg:'Access denied, this user is not allowed to edit this post'});
            }
            if(!req.params.postId){ // pass this in for a new post.
                return res.status(400).json({'msg':'postId not found'})
                // Post.findByIdAndUpdate(
                //     req.params.id,
                //     { $set: replyFields },
                //     { new: true }
                // )
                // .then(post => res.json(post))
                // .catch(err => res.status(400).json({msg:'Could not update the profile'}))
            }
            // find specific post and reply within the post.
            Post.findById(req.params.postId)
                .then(post => {
                    
                    if( post.replies.filter( reply => reply._id.toString() === req.params.replyId).length === 0 ) {
                        // reply does not exsist
                        return  res.status(404).json({replynotexist:'reply does not exist'});
                       
                        
                    }
                    
                    const findReplyIndex = post.replies.map( item => item._id.toString() ).indexOf(req.params.replyId);
                    const postReply = post.replies[findReplyIndex];
                    // update the text.
                    postReply.text = req.body.text;
                    const postReplyReturn = {
                        postId: req.params.postId,
                        replyObj: postReply
                    }
                  
                    
                    post.save()
                        .then( () => console.log('saved'))
                        .catch(err => res.status(400).json({msg:'Reply not saved'}))       
                    // return the specific reply 
                    return res.status(200).json(postReplyReturn)
                
                })
                .catch(err => res.status(400).json({msg:'Post not found'}))
          
            
    
    })
}); // router posts reply end






// @route Grab Edit Post reply POST api/posts/:postId/:replyId
// @access Private
router.post( '/:postId/:replyId',passport.authenticate('jwt', { session: false }),(req, res) => {
    
    Profile.findOne({ user: req.user.id })
        .then(profile => {
          
            if(profile.user.toString() !== req.user.id){
                return res.status(401).json({msg:'Access denied, this user is not allowed to edit this post'});
            }
            if(!req.params.postId){ // pass this in for a new post.
                return res.status(400).json({'msg':'postId not found'})
            
            }
            // find specific post and reply within the post.
            Post.findById(req.params.postId)
                .then(post => {
                    
                    if( post.replies.filter( reply => reply._id.toString() === req.params.replyId).length === 0 ) {
                        // reply does not exsist
                        return  res.status(404).json({replynotexist:'reply does not exist'}); 
                    }
                    
                    const findReplyIndex = post.replies.map( item => item._id.toString() ).indexOf(req.params.replyId);
                    const postReply = post.replies[findReplyIndex];
                    const postReplyReturn = {
                        postId: req.params.postId,
                        replyObj: postReply
                    }
                        
                    return res.status(200).json(postReplyReturn)
          
                })
                .catch(err => res.status(400).json({msg:'Post not found'}))
    })
}); // router posts reply end





    module.exports = router;






