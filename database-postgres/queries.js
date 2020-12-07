const postgres = require('postgres');
const {Pool, Client} = require('pg');
let postgresConfig = require('./config.js');


const pool = new Pool(postgresConfig)

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})


const client = new Client(postgresConfig)
client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})



//Get all products list


const getProductList = (cb) => {
  client.query(
      `SELECT *
      FROM products
      `,
      (err, results, fields) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
      }
    });
  };


//get single product with a product id


const getSingleProduct = (id, cb) => {
  client.query(
    `SELECT *
    FROM products
    WHERE product_id=$1
    `,
    id,
    (err, results, fields) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results)
      }
    });
  };


//get a single products features using that products id


const getSingleProductFeatures = (id, cb) => {
  client.query(
    `SELECT *
    FROM product_feature
    WHERE product_id=$1
    `,
    id,
    (err, results, fields) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results)
      }
    });
  };


//get a single products styles including the skus


const getSingleProductStyles = (id, cb) => {
  client.query(
    `SELECT *
    FROM styles st
    INNER JOIN style_skus sk
    ON st.style_id = sk.style_id
    WHERE p.product_id=$1
    `,
    id,
    (err, results, fields) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results)
      }
    });
  };

//get a single products photos


const getSingleProductPhotos = (id, cb) => {
  client.query(
    `SELECT thumbnail_url, url
    FROM styles_photos sp
    INNER JOIN styles s
    ON s.style_id = sp.style_id
    WHERE p.product_id=$1
    `,
    id,
    (err, results, fields) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results)
      }
    });
  };


module.exports = {
  getProductList,
  getSingleProduct,
  getSingleProductFeatures,
  getSingleProductStyles,
  getSingleProductPhotos
};