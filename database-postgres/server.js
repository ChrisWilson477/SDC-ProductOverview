require('newrelic');
const express = require('express');
const app = express();
const db = require('./queries');
const PORT = 4000;
const cors = require('cors');
app.use(express.static('../client/dist')); // Host your dist folder up to the server
app.use(express.json()); // Alternative to BodyParser

<<<<<<< Updated upstream
app.get('/products/list', db.getProductList);
app.get('/products/:product_id', db.getSingleProduct);
app.get('/products/:product_id/styles', db.getSingleProductStyles);
=======


app.get('http://52.26.193.201:3000/products/list', db.getProductList)
app.get('http://52.26.193.201:3000/products/:product_id', db.getSingleProduct)
app.get('http://52.26.193.201:3000/products/:product_id/styles', db.getSingleProductStyles)



>>>>>>> Stashed changes

// Listening for requests on the PORT
app.listen(PORT, () => {
	console.log(`Serving up now at ${PORT}`);
});
