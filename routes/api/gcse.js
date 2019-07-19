const express = require('express');
const request = require('request');
const router = express.Router();

const googleAPIKEY = require('../../config/keys').googleAPIKEY;
const customerSearchEngineID = require('../../config/keys').customerSearchEngineID; 

router.get('/', (req, res) => {
    try {
        res.json({msg:'GCSE works!'})
    } catch (error) {
        console.log(error)
    }
})

// Type     :   GET
// Route    :   api/google-custom-search/:query
// Desc     :   Google custom search api
// Access   :   Public, anyone can search.
router.get('/:query', (req, res) => {

    try {
        const options = {
            uri: `https://www.googleapis.com/customsearch/v1?key=${googleAPIKEY}&cx=${customerSearchEngineID}&q=${req.params.query}`,
            method: 'GET',
            headers : {'user-agent':'nodejs'}
        }
        request(options, (error, response, body)=> {
            if( error ) console.log(error);
            if(response.statusCode !== 200) return res.status(404).json({msg:'Query could not run'});
            const data = JSON.parse(body).items;

            // send back the array of items
            if(data && data.length > 0){
                res.json(data); 
            } else {
                res.status(404).send('There is no data to return');
            }
         
        })
      
    } catch (error) {
        res.status(500).send('Server Error',error);
    }
  
})


module.exports = router;