// Connection phpmyadmin to server 
const express = require("express");
var mysql = require("mysql");
var cors = require('cors');             //fixing localhost request
const bodyParser = require('body-parser')

const recipeRoute = require('./routes/recipes')
const materialRoute = require('./routes/materials')
const productsRoute = require('./routes/products')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.use('/materials', materialRoute);
app.use('/nkProducts', productsRoute);
app.use('/recipes', recipeRoute);
app.listen(PORT, () => {
    console.log(`Server is Live on ${PORT}`)
})




