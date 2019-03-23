const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../../config/keys');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validatePostInput = require('../../validation/post');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.headline) profileFields.headline = req.body.headline;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.headline) profileFields.city = req.body.headline;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);


// Type         :  GET
// Route:       :  api/profile/comment/:handle
// Description  :  Get specific comment from gvien user profile handle 
// Access:      : Public: Anyone can see all comments on a user profile.
// Returns      : Returns a specific comment
router.get('/comment/:handle/:commentId', (req, res) => {
 
    Profile.findOne({handle:req.params.handle})
    .then( profile => {
      if( profile.comments.filter( comment => comment._id.toString() === req.params.commentId).length === 0 ) {
        // reply does not exsist
       return  res.status(404).json({msg:'comment does not exist'});
     }
     const commentIndex = profile.comments.map( comment => comment._id.toString()).indexOf(req.params.commentId);
      // return the specific comment
      return res.status(200).json(profile.comments[commentIndex])
    })
      .catch( err => res.status(400).json({msg:'Profile not found'}))
})

// Type         :  GET
// Route:       :  api/profile/comment/:handle
// Description  :  Get all comments for the specific user profile 
// Access:      : Public: Anyone can see all comments on a user profile.
router.get('/comment/:handle', (req, res) => {
 
    Profile.findOne({handle:req.params.handle})
      .then( profile => res.status(200).json(profile))
      .catch( err => res.status(400).json({msg:'Profile not found'}))
})

// Type         :  POST
// Route:       :  api/profile/comment/:handle
// Description  :  Add a comment to the specific user profile 
// Access:      : Private, any logged in user can comment.
router.post('/comment/:handle',passport.authenticate('jwt',{session:false}), (req,res) => {

    // validation is same as post validation
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    //save new comment into the profile with the above user handle
    Profile
        .findOne({ handle: req.params.handle })
        .then(profile => {
              const newComment = {
                user:req.user.id,
                text: req.body.text,
                name: req.user.name,
                avatar: req.user.avatar
                };
      // Add to exp array
      profile.comments.unshift(newComment);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json({msg:`There was an error saving the new profile comment ${err}`} ))   

        })
        .catch( err => res.status(400).json({'msg':'Cannot find user'}) )
  });

// Type         :  POST
// Route:       :  api/profile/comment/:handle/:commentId
// Description  :  Edit a comment to the specific user profile 
// Access:      : Private, owner or comment can edit
router.post('/comment/:handle/:commentId',passport.authenticate('jwt',{session:false}), (req,res) => {

  // validation is same as post validation
  const { errors, isValid } = validatePostInput(req.body);
  if(!isValid){
      return res.status(400).json(errors)
  }
  //save new comment into the profile with the above user handle
   // Get fields
    const commentFields = {};

    commentFields.user = req.user.id;
    if (req.body.text) commentFields.text = req.body.text;
    if (req.user.name) commentFields.name = req.user.name;
    if (req.user.avatar) commentFields.avatar = req.user.avatar;

    Profile
    .findOne({handle:req.params.handle})
    .then(profile => {
      
            if( profile.comments.filter( comment => comment._id.toString() === req.params.commentId).length === 0 ) {
              // reply does not exsist
              return  res.status(404).json({msg:'comment does not exist'}); 
            }
         
              const findCommentIndex = profile.comments.map( comment => comment._id.toString() ).indexOf(req.params.commentId);

              const commentData = profile.comments[findCommentIndex];

                // update the text.
              commentData.text = req.body.text;
              // const commentDataReturn = {
              //     commentId: req.params.commentId,
              //     replyObj: commentData
              // }
              
              // finally save the profile
              profile.save()
                  .then( profile =>  res.status(200).json(profile) )
                  .catch(err => res.status(400).json({msg:'Comment not saved'}))       
               // return the specific reply 
         
    })
    .catch( ()=> res.status(400).json({msg:'Could not get user handle'}))
});

// Type         :  POST
// Route:       :  api/profile/reply/:handle/:commentId/
// Description  :  Add a reply to a comment inside the specified user profile handle 
// Access:      : Private, any logged in user can reply.
router.post('/reply/:handle/:commentId',passport.authenticate('jwt',{session:false}), (req,res) => {

    // validation is same as post validation
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    Profile
      .findOne({handle:req.params.handle})
      .then( profile => {
            profile.comments.forEach(comment => {
                if(comment._id.toString() === req.params.commentId.toString()){
                    // comment exists, add reply
                    const newReply = {
                      text:req.body.text,
                      name:req.user.name,
                      avatar:req.user.avatar,
                      user:req.user.id
                    }
                    //add new reply to the comments.replies array
                    comment.replies.unshift(newReply);
                    profile
                      .save()
                      .then( profile => res.status(200).json(profile))
                      .catch ( () => res.status(400).json({msg:'Could not add comments reply to profile'}))

                }
            });        
      })
      .catch( err => res.status(400).json({msg:`Could not find the comment`}))
     
    
      .catch( err => res.status(400).json({msg:`Could not find the user's handle`}))
         //save new comment into the profile with the above user handle
})


// Type         :  POST
// Route:       :  api/profile/reply/:handle/:commentId/:replyId
// Description  :  Edit a reply to a comment inside the specified user profile handle 
// Access:      : Private, any logged in user can reply.
router.post( '/reply/:handle/:commentId/:replyId',passport.authenticate('jwt', { session: false }),(req, res) => {

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
  if (req.user.name) replyFields.name = req.user.name;
  if (req.user.avatar) replyFields.avatar = req.user.avatar;


  Profile
      .findOne({handle:req.params.handle})
      .then(profile => {

        profile.comments.forEach(comment => {
          if(comment._id.toString() === req.params.commentId.toString()){
        
              if( comment.replies.filter( reply => reply._id.toString() === req.params.replyId).length === 0 ) {
                // reply does not exsist
                return  res.status(404).json({replynotexist:'reply does not exist'}); 
              }
           

                const findReplyIndex = comment.replies.map( item => item._id.toString() ).indexOf(req.params.replyId);

                const commentReply = comment.replies[findReplyIndex];
  
                  // update the text.
                commentReply.text = req.body.text;
                const commentReplyReturn = {
                    commentId: req.params.commentId,
                    replyObj: commentReply
                }
                
                // finally save the profile
                profile.save()
                    .then( () => console.log('saved'))
                    .catch(err => res.status(400).json({msg:'Reply not saved'}))       
                 // return the specific reply 
                return res.status(200).json(commentReplyReturn)
        
          }

          })

      })
      .catch( ()=> res.status(400).json({msg:'Could not get user handle'}))
}); // router comments reply end


// Type          :  POST
// Route         :  api/profile/comment/like/:handle/:commentId
// Description   :  Like a comment in users profile
// Access:       :  Private
router.post('/comment/like/:handle/:commentId',passport.authenticate('jwt',{session:false}), (req,res) => {
    Profile
      .findOne({handle:req.params.handle})
      .then(profile => {
           profile.comments.forEach (comment => {
              if(comment._id.toString() === req.params.commentId.toString()){
                    // check to see if user has liked, it not push user to likes array.
                    if(comment.likes.filter( like => like.user.toString() === req.user.id).length > 0 ) {
                      return res.status(400).json({'alreadyLiked':'User has alread liked this comment reply'})
                    }
                    // not already liked,push logged in user to likes array.
                    comment.likes.unshift({user:req.user.id})
                    // save profile
                    profile
                      .save()
                      .then( profile => res.status(200).json(profile))
                      .catch( err => res.status(400).json({msg:'Could not save profile!'}))
              }
           })
      })
      .catch( err => res.status(400).json({msg:'Could not find user handle'}))
})

// Type          :  POST
// Route         :  api/profile/comment/unlike/:handle/:commentId
// Description   :  UnLike a comment in users profile
// Access:       :  Private
router.post('/comment/unlike/:handle/:commentId',passport.authenticate('jwt',{session:false}), (req,res) => {
  Profile
    .findOne({handle:req.params.handle})
    .then(profile => {
         profile.comments.forEach (comment => {
            if(comment._id.toString() === req.params.commentId.toString()){
                  // check to see if user has liked, if not, send back response
                  if(comment.likes.filter( like => like.user.toString() === req.user.id).length === 0 ) {
                    return res.status(400).json({'alreadyLiked':'User has not liked this comment yet'})
                  }
                  // find like to remove
                  const removeIndex = comment.likes.map( like => like.user.toString() ).indexOf(req.user.id);
                  // remove user like
                  comment.likes.splice(removeIndex,1);
                  // save profile
                  profile
                    .save()
                    .then( profile => res.status(200).json(profile))
                    .catch( err => res.status(400).json({msg:'Could not save profile!'}))
            }
         })
    })
    .catch( err => res.status(400).json({msg:'Could not find user handle'}))
})


// Type          :  DELETE
// Route         :  api/profile/comment/:handle/:commentId
// Description   :  Delete a specific comment on the profile.
// Access:       :  Private
router.delete('/comment/:handle/:commentId',passport.authenticate('jwt',{session:false}), (req,res) => {
    Profile
    .findOne({handle:req.params.handle})
      .then(profile => {
            const removeIndex = profile.comments.map(comment => comment._id.toString() ).indexOf(req.params.commentId);
            // remove comment
            if (removeIndex === -1){ res.status(400).json({msg:'Could not find comment to delete!'})}
            else {
              profile.comments.splice(removeIndex,1);
              profile
                .save()
                .then( profile => res.status(200).json(profile))
                .catch( err => res.status(400).json({msg:'Could not delete comment'}))
            }
        })

      .catch(err=> res.status(400).json({msg:'cannot find comment to delete!'}))
})


/*** GENERAL PROFILE ROUTES NOT RELATED TO COMMENTS! */

// Type         :  POST
// Route:       :  api/profile/education
// Description  :  Add or edit? education to profile
// Access:      : Private, Only created user can make changes to his/her profile
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //get fields
    const educationFields = {};
    educationFields.user = req.user.id

    Profile.findOne({ user: req.user.id })
      .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json({ profile: 'Not able to save education for user' }) )
     })
    .catch(err => res.status(404).json({ profile: 'Unable to find user!' }) )
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);


// @route       GET api/profile/github/:username/:count/:sort
// @desc        Get github data from github api
// @access      Public
router.get("/github/:username/:count/:sort", (req, res) => {
  username = req.params.username;
  clientId = keys.gitHub_client_id;
  clientSecret = keys.gitHub_client_secret;
  count = req.params.count;
  sort = req.params.sort;
  const options = {
    url: `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`,
    headers: {
      "User-Agent": "request"
    }
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      res.json(info);
    }
  }
  request(options, callback);
});


module.exports = router;
