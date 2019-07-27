const mongoose = require('mongoose');

const fs = require('fs');

const db = require('../../config/keys').mongoURI;

// require the Portfolio model
const Portfolio = require('../../models/Portfolio');

const connectDB = async ()  => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`Special DB connect. File: ${__filename} used for bulk changes to Portfolio Data`)
    } catch (error) {
        console.error(`There was an db connection error ${error.message}`);
        process.exit(1);
    }
}

connectDB();

// READ JSON FILE
const portfolios = JSON.parse(fs.readFileSync('data/portfolio-data/portfolio.json','utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Portfolio.create(portfolios);
        console.log('Data was loaded from Portfolio.json! Please view data on cloud');
    } catch (error) {
        console.error('Error importing data',error);
    }
    process.exit();
}

// DELETE ALL THE DATA FROM DB
const deleteData = async () => {
    try {
        await Portfolio.deleteMany();
        console.log('All documents was deleted');
    } catch (error) {
        console.log(error)
    }
    process.exit();
}


// CALL OPERATIONS ABOVE SEPERATELY : node data/portfolio-data/import-data-portfolio.js
      importData();
     // deleteData();