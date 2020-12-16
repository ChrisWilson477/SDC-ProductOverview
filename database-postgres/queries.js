const postgres = require('postgres');
const {Pool} = require('pg');
let postgresConfig = require('./config.js');


const pool = new Pool(postgresConfig)


pool.connect();
//Get all products list


const getProductList = (req, res) => {
  //Pull product list from DB with limit so doesnt crash server
  pool.query(
      `SELECT *
      FROM products
      LIMIT $1
      `,
      [10],
      (err, results, fields) => {
        if (err) {
          throw(err);
        }
        res.status(200).send(results.rows)
    });
  };


//get single product with a product id


const getSingleProduct = (req, res) => {
  const id = req.params.product_id;
  let productInfo = {};
  //pull product info from DB
  pool.query(
    `SELECT *
    FROM products p
    WHERE p.id =$1
    `,
    [id],
      (err, results, fields) => {
        if (err) {
          throw(err);
        } else {
          productInfo = results['rows'][0];
          productInfo['features'] =[];
          const id = req.params.product_id;
          //pull features from DB
            pool.query(
              `SELECT feature, value
              FROM product_features
              WHERE product_id = $1
              `,
              [id],
              (err, results, fields) => {
              if(err) {
                throw(err)
              }

             productInfo['features'].push(results['rows'][0]);
             res.status(200).send(productInfo);
          });
        };
      });
};



//get single product styles with sku and photos


const getSingleProductStyles = (req, res) => {
  const id = req.params.product_id;
  let stylesInfo = {};
  //pull styles from DB
  pool.query(
    `SELECT s.style_id, s.name, s.original_price, s.sale_price, s."default?"
    FROM styles s
    WHERE s.product_id=$1
    `,
    [id],
      (err, results, fields) => {
        if (err) {
          throw(err);
        } else {
          stylesInfo.product_id = id;
          stylesInfo.results =[];
          styleOne = results.rows[0];
          styleTwo = results.rows[1];
          //pull photos from DB
          pool.query(
          `SELECT p.style_id, p.thumbnail_url, p.url
          FROM style_photos p
          WHERE p.product_id=$1
          `,
          [id],
          (err, results, fields) => {
            if(err) {
              throw(err)
            } else {
              let photoOne = [];
              let photoTwo = [];
              results.rows.map((row) => {
                if(row.style_id === 1) {
                  delete row.style_id
                  photoOne.push(row);
                } else if(row.style_id === 2) {
                  delete row.style_id
                  photoTwo.push(row);
                }
              })
              styleOne.photos = photoOne;
              styleTwo.photos = photoTwo;
              //pull skus from DB
              pool.query(
              `SELECT ss.style_id, ss.size, ss.inStock
              FROM style_skus ss
              WHERE ss.product_id=$1
              `,
              [id],
              (err, results, fields) => {
                if(err) {
                  throw(err)
                }

                let skuOne = {};
                let skuTwo = {};
                results.rows.map((row) => {
                if(row.style_id === 1) {
                  delete row.style_id
                  skuOne[row.size] = row.instock;
                } else if(row.style_id === 2) {
                  delete row.style_id
                  skuTwo[row.size] = row.instock;
                }
              })
              styleOne.skus = skuOne;
              styleTwo.skus = skuTwo;
              stylesInfo.results.push(styleOne, styleTwo)
              console.log(stylesInfo)


              res.status(200).send(stylesInfo)
            });
          };
        });
      };
    });
  };



module.exports = {
  getProductList,
  getSingleProduct,
  getSingleProductStyles
};