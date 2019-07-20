const express = require('express');
const router = express.Router();
const passport = require('passport');
const contentful = require('contentful');

const contentful_space = require('../../config/keys').contentful_space;
const contentful_accessToken = require('../../config/keys')
  .contentful_accessToken;

const client = contentful.createClient({
  space: contentful_space,
  accessToken: contentful_accessToken
});

// Type: GET
// Route: api/articles/:id
// parameter id is the article ID from contentful
// Desc: Grab the article by ID and display full article.
// Access: Public
router.get('/:id', (req, res) => {
  // Contentful config use
  const articleId = req.params.id;

  client
    .getEntry(articleId)
    .then(entry => {
      // console.log('This is the entry rich text body',entry.fields)
      res.status(200).json({ msg: entry });
    })
    .catch(err => res.status(400).json({ msg: 'There was an error' }));
});

// Type: GET
// Route: api/articles/
// Get all articles for now from contentful
// Desc: Grab the article by ID and display full article.
// Access: Public

router.get('/', (req, res) => {
  client
    .getEntries({
      limit: 1000,
      order: 'sys.createdAt'
    })
    .then(function(entries) {
      res.status(200).json(entries.items);
    })
    .catch(err => res.status(400).json({ msg: 'There was an error' }));
});

module.exports = router;
