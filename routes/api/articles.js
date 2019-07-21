const express = require('express');
const router = express.Router();
const passport = require('passport');
const contentful = require('contentful');

const contentful_space = require('../../config/keys').contentful_space;
const contentful_accessToken = require('../../config/keys').contentful_accessToken;
const isEmpty = require('../../validation/is-empty');
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
    // get back entries from contentful. They give as a shitty ass API we need to work with it a bit to get back only rel articles
    let order = req.query.order || 'sys.createdAt';
    switch(order) {
      case 'createdAt':
        order = 'sys.createdAt';
        break;
      case '-createdAt':
        order = '-sys.createdAt'
        break;
      case 'updatedAt':
        order = 'sys.updatedAt';
        break;
      case '-updatedAt':
        order = '-sys.updatedAt'
        break;
      default: 
        order = 'sys.createdAt'
        break;
    }
    let entries = await client
      .getEntries({
        limit: 1000,
        order
      });     

   // BUILD THE QUERY

   let query = entries.items;  
   let queryToSend = [];
   if(query) {
      query.forEach( entry => {
  
        const contentType = entry.sys.contentType.sys.id;

        // check to see if we have a req.query.contentType
        if( !isEmpty(req.query.contentType) && contentType === req.query.contentType ) {

            // add entry to queryToSend
            queryToSend.push(entry);
        }
        // no filter was applied
        if( isEmpty(req.query.contentType) ) {
          // send back all relevant article content
            if (
              contentType === 'blogPost' || 
              contentType === 'pythonPosts' || 
              contentType === 'mongoDb' || 
              contentType === 'reactPosts' || 
              contentType === 'expressPosts' 
            )
            queryToSend.push(entry);
        }
      })


        // sort query to send
        if(!isEmpty(req.query.sort)) {
          queryToSend.sort( (a,b)=> {
            let x,y;
            switch(req.query.sort){
              case 'title':
                   x = a.title.toLowerCase();
                   y = b.title.toLowerCase();
                  return x < y ? -1 : x > y ? 1: 0;
              case '-title':
                  x = a.title.toLowerCase();
                  y = b.title.toLowerCase();
                 return y < x ? -1 : y > x ? 1: 0;
              case 'author':
                   x = a.author.fields.name.toLowerCase();
                   y = b.author.fields.name.toLowerCase();
                  return x < y ? -1 : x > y ? 1: 0;
              case 'author':
                  x = a.author.fields.name.toLowerCase();
                  y = b.author.fields.name.toLowerCase();
                  return y < x ? -1 : y > x ? 1: 0;
              default:
                   x = a.title.toLowerCase();
                   y = b.title.toLowerCase();
                  return x < y ? -1 : x > y ? 1: 0;
            }
          })
        } 
    
        // finally, send back array response
     
        res.json(queryToSend);
        console.log(queryToSend.length);
   }
   
  } catch (error) {
     res.status(400).json({msg:'There was an error'})
  }

  
});

module.exports = router;
