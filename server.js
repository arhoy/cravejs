const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const cloudinary = require('cloudinary');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;



// Cloudinary config
const cloud_name = require('./config/keys').cloud_name;
const cloud_api_key = require('./config/keys').cloud_api_key;
const cloud_api_secret = require('./config/keys').cloud_api_secret;

// Contentful config see articles js

// Connect to MongoDB
mongoose
  .connect(db, {useNewUrlParser:true})
  .then(() => console.log(`MongoDB Connected to database: ${db.substring(db.length-7)}`))
  .catch(err => console.log(err));


// Routes to use
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const product = require('./routes/api/product');
const order = require('./routes/api/order');
const resume = require('./routes/api/resume');
const articles = require('./routes/api/articles');

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Cloudinary config
cloudinary.config({
    cloud_name:cloud_name,
    api_key: cloud_api_key,
    api_secret: cloud_api_secret
})

// For contenful see artices.js

// for env variables
require('dotenv').config();


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/product', product);
app.use('/api/order',order);
app.use('/api/resume',resume);
app.use('/api/articles',articles);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
