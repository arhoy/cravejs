const mongoose = require('mongoose');

const fs = require('fs');

const db = require('../../config/keys').mongoURI;

// require the product model
const Product = require('../../models/Product');

const connectDB = async ()  => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`Special DB connect. File: ${__filename} used for bulk changes to Product Data`)
    } catch (error) {
        console.error(`There was an db connection error ${error.message}`);
        process.exit(1);
    }
}

connectDB();

// READ JSON FILE
const products = JSON.parse(fs.readFileSync('data/product-data/products.json','utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Product.create(products);
        console.log('Data was loaded from products.json! Please view data on cloud');
    } catch (error) {
        console.error('Error importing data',error);
    }
    process.exit();
}

// DELETE ALL THE DATA FROM DB
const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log('All documents was deleted');
    } catch (error) {
        console.log(error)
    }
    process.exit();
}


// CALL OPERATIONS ABOVE SEPERATELY : node data/product-data/import-data-products.js
      importData();
     // deleteData();