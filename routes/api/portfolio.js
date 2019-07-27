const express = require('express');

const router = express.Router(); 

const Portfolio = require('../../models/Portfolio');

//      Name        :   Get all Portfolios
//      Type        :   GET
//      Route       :   api/portfolio
//      Desc        :   Get all the portfolios
//      Access      :   Public        
router.get('/', async (req, res) => {
    try {
        const portfolio = await Portfolio.find();
        res.json(portfolio);
    } catch (error) {
        console.error('There was an error', error);
    }
})

module.exports = router;