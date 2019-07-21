const express = require('express');
const router = express.Router();
const passport = require('passport');
const contentful = require('contentful');

const contentful_space = require('../../config/keys').contentful_space;
const contentful_accessToken = require('../../config/keys').contentful_accessToken;

const client = contentful.createClient({
  space: contentful_space,
  accessToken: contentful_accessToken
});

//  Type      :     GET
//  Route     :     api/articles/model/:content_type
//  Desc      :     get all articles for a specific content type
//  Access    :     anyone can access
router.get('/model/:content_type', async (req, res) => {
    try {
      const contentType = req.params.content_type;
      const entries = await client.getEntries({
        limit: 20,
        'content_type': contentType, // content type is the content model name in contentful
      });
      console.log(entries.items[0].fields);
      res.json(entries.items[0].fields);
    } catch (error) {
      console.error('There as an error with the slug request',error);
      res.status(400).json({msg:'There was an error with the api/articles/model get request'});
    }
})

//  Type      :     GET
//  Route     :     api/articles/:content_type/:slug_name
//  Desc      :     get articles by slug name
//  Access    :     anyone can access
router.get('/:content_type/:slug_name', async (req, res) => {
  try {
    const contentType = req.params.content_type;
    const slugName = req.params.slug_name;

     const entries = await client.getEntries({
       limit: 1,
       'content_type': contentType, // content type is the content model name in contentful
       'fields.slug': slugName
     });
     res.json(entries.items); 
  } catch (error) {
      console.error('There as an error with the slug request',error);
      res.status(400).json({msg:'There was an error with the slug request'});
  }  
})


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

router.get('/', async (req, res) => {

  try {
    const entries = await client
      .getEntries({
        limit: 1000,
        order: '-sys.createdAt'
      });              
   res.status(200).json(entries.items);  
  } catch (error) {
     res.status(400).json({msg:'There was an error'})
  }

  
});

module.exports = router;
