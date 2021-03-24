require('newrelic');
const express = require('express');
const app = express();
const db = require('./queries');
const PORT = 4000;
const cors = require('cors');
app.use(express.static('../client/dist')); // Host your dist folder up to the server
app.use(express.json()); // Alternative to BodyParser

//Routes
//Product List
app.get('/products/list', async (req, res) => {
  try {
    let productList = await db.getProductList();
    res.status(200).json(productList);
  } catch (err) {
    console.log(err.message);
  }
});

//Single Product with Features and Values
app.get('/products/list/:product_id', async (req, res) => {
  try {
    let { product_id } = req.params;
    let singleProduct = await db.getSingleProduct(product_id);
    res.status(200).json(singleProduct);
  } catch (err) {
    console.log(err.message);
  }
});

//Single Product Styles
app.get('/products/:product_id/styles', async (req, res) => {
  try {
    let { product_id } = req.params;
    let singleProductStyles = await db.getSingleProductStyles(
      product_id,
    );
    res.status(200).json(singleProductStyles);
  } catch (err) {
    console.log(err.message);
  }
});

// Listening for requests on the PORT
app.listen(PORT, () => {
  console.log(`Serving up now at ${PORT}`);
});
