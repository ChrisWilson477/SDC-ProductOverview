const postgres = require('postgres');
const { Pool } = require('pg');
let postgresConfig = require('./config.js');

const pool = new Pool(postgresConfig);

//Get all products list
//Pull product list from DB with limit so doesnt crash server
const getProductList = () => {
  let productList = pool.query(`SELECT * FROM products LIMIT $1`, [
    10,
  ]);
  return new Promise((resolve, reject) => {
    productList
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) =>
        console.error('Error executing query', err.stack),
      );
  });
};

//get single product with a product id
const getSingleProduct = (id) => {
  let singleProduct = pool.query(
    `SELECT * FROM products WHERE id=$1`,
    [id],
  );
  let featuresAndValues = pool.query(
    `SELECT feature, value FROM product_features WHERE product_id=$1`,
    [id],
  );
  return new Promise((resolve, reject) => {
    singleProduct.then(async (result) => {
      let product = result.rows;
      product[0]['features'] = await featuresAndValues.then(
        (data) => {
          return data.rows;
        },
      );
      resolve(product);
    });
  }).catch((err) => {
    console.error('Error executing query', err.stack);
  });
};

//get single product styles with a product id
const getSingleProductStyles = (id) => {
  let styles = pool.query(
    `SELECT style_id, name, original_price, sale_price, "default?" FROM styles WHERE product_id = $1`,
    [id],
  );
  let photos = pool.query(
    `SELECT style_id, thumbnail_url, url FROM style_photos WHERE product_id=$1`,
    [id],
  );
  let skus = pool.query(
    `SELECT style_id, size, inStock FROM style_skus WHERE product_id=$1`,
    [id],
  );

  return new Promise((resolve, reject) => {
    let styleInfo = {};
    styleInfo['product_id'] = id;
    styleInfo['results'] = [];
    styles.then(async (result) => {
      let productStyle = result.rows;
      let productStyleOne = result.rows[0];
      let productStyleTwo = result.rows[1];
      let photoOne = [];
      let photoTwo = [];
      let skuOne = {};
      let skuTwo = {};
      await photos.then((photoData) => {
        photoData.rows.map((row) => {
          if(row.style_id === 1){
            delete row.style_id
            photoOne.push(row)
            productStyleOne['photos'] = photoOne;
          } else if(row.style_id === 2){
            delete row.style_id
            photoTwo.push(row)
            productStyleTwo['photos'] = photoTwo;
          }
        })
      });
      await skus.then((skuData) => {
        {console.log(skuData)}
        skuData.rows.map((row) => {
          if(row.style_id === 1){
            delete row.style_id
            skuOne[row.size] = row.instock
            productStyleOne['skus'] = skuOne;
          } else if(row.style_id === 2){
            delete row.style_id
            skuTwo[row.size] = row.instock
            productStyleTwo['skus'] = skuTwo;
          }
        })
      });
      styleInfo['results'].push(productStyleOne, productStyleTwo);
      resolve(styleInfo);
    });
  }).catch((err) => {
    console.error('Error executing query', err.stack);
  });
};



module.exports = {
  getProductList,
  getSingleProduct,
  getSingleProductStyles,
};
