const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const api_key = require('../../config/keys').sendGridAPIKEY;

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Sendgrid and nodemailer
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

// Load User model
const User = require('../../models/User');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: api_key
  }
}))

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));



// @route   POST api/users/register
// @desc    Register user - stores user inside mongo composs user model.
// @access  Public
// test using postman x-www-form-urlencoded.
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } 
    else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              // send user email after signup / register
              transporter.sendMail({
                to: req.body.email,
                from: 'alex.cravejs@gmail.com',
                subject: 'Sign Up Success',
                html: `
                    Hello ${req.body.name}! Thank you for signing up to Cravejs.  <br/>
                
                    <p className = "bold"> From the cravejs team </p>
                  `
              })
             
              return res.json(user) // postman output
            }) 
            .catch(err => console.log(`Error in hashing password user.js${err}`));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @Postman -- bod, xxxx form-url-encoded, ensure key value pairs are correct.
// @keys: email, password.
// @desc    Login User / Returning JWT Token
// @access  Public
// @ if token is sent pack inside body, body of output display, then we are good!
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400*5 },
          (err, token) => {
            // send token back! -- this is the response from postman
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// Type: GET
// Route: api/users/current
// Desc: Get back the user info for the current user.
// Access: Private
router.get('/current',passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user.id)
    .populate({
      path: 'cart.items.productId',
      model:'product'

    })
    .then( user => res.status(200).json(user))
    .catch( err => res.status(400).json({'msg':'Not able to retrieve items'}))
  }
);
// Type: GET
// Route: api/users/currentTotal
// Desc: Get back the current total in the cart for the user.
// Access: Private
router.get('/currentTotal',passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.user.id)
  .populate({
    path: 'cart.items.productId',
    model:'product'

  })
  .then( user => {
    console.log(user);
    let total = 0;
    let quantity = 0;
      user.cart.items.forEach(item => {
        total += item.productId.price*item.quantity;
        quantity += item.quantity;
      });
      console.log(total);
      res.status(200).json({cartTotal:total, cartQuantity: quantity})
  })
  .catch( () => res.status(400).json({'msg':'Not able to retrieve items'}))
});

module.exports = router;
