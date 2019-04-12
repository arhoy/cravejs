const express = require('express');
const router = express.Router();
const passport = require('passport');
var cloudinary = require('cloudinary');

const Resume = require('../../models/Resume');
const validateResumeInput = require('../../validation/resume');

// Cloudinary config
const cloud_name = require('../../config/keys').cloud_name;
const cloud_api_key = require('../../config/keys').cloud_api_key;
const cloud_api_secret = require('../../config/keys').cloud_api_secret;

// Cloudinary config
cloudinary.config({
    cloud_name:cloud_name,
    api_key: cloud_api_key,
    api_secret: cloud_api_secret
})





// Type: POST
// Route: api/resume
// Desc: Create resume and add to the resume db
// Access: Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    let imageUrl;

    
            imageUrl = result.resources[0].url;

            // upload to mlab.
              // console.log('the result from cloudinary is: ',result)
              //console.log('image url for mlab is: ',imageUrl);
            const newResume = new Resume({
                user:req.user.id,
                imageUrl: imageUrl
            })
            newResume
                .save()
                .then( post =>  res.status(200).json(post) )
                .catch(err => res.status(400).json({msg:`There was an error saving the new product ${err}`} ))  
        
        
});

// Type: GET
// Route: api/resume
// Desc: Get list of resume / images
// Access: Private / only see the images they uploaded.
router.get('/', passport.authenticate('jwt',{session:false}), (req,res) => {

    cloudinary.v2.api.resources_by_tag(["admin@dash-intel.com"],
    function(error, result){
        if(error){
            console.log(`There as an error with the request, ${error}`)
        }
        else {
            res.status(200).json(result.resources);
        }
    })
})


module.exports = router;
