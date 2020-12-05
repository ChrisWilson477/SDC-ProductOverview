const postgres = require("postgres");
let postgresConfig = require('./config.js');

const connection = postgres.createConnection(postgresConfig);

connection.connect();


//Get all products list


const getProductList = (cb) => {
  connection.query(
    `SELECT *
    FROM products
    `,
    (err, result, fields) => {
      if(err)
        cb(err)
      } else {
        cb(null, results)
      }
    }
  )
}


//get single product with a product id


const getSingleProduct = (id, cb) => {
  connection.query(
    `SELECT *
    FROM products
    WHERE product_id=?
    `,
    id,
    (err, result, fields) => {
      if(err)
        cb(err)
      } else {
        cb(null, results)
      }
    }
  )
}


//get a single products features using that products id


const getSingleProductFeatures = (id, cb) => {
  connection.query(
    `SELECT *
    FROM product_feature
    WHERE product_id=?
    `,
    id,
    (err, result, fields) => {
      if(err)
        cb(err)
      } else {
        cb(null, results)
      }
    }
  )
}


//get a single products styles including the skus


const getSingleProductStyles = (id, cb) => {
  connection.query(
    `SELECT *
    FROM styles st
    INNER JOIN style_skus sk
    ON st.style_id = sk.style_id
    WHERE p.product_id=?
    `,
    id,
    (err, result, fields) => {
      if(err)
        cb(err)
      } else {
        cb(null, results)
      }
    }
  )
}


//get a single products photos


const getSingleProductPhotos = (id, cb) => {
  connection.query(
    `SELECT thumbnail_url, url
    FROM styles_photos sp
    INNER JOIN styles s
    ON s.style_id = sp.style_id
    WHERE p.product_id=?
    `,
    id,
    (err, result, fields) => {
      if(err)
        cb(err)
      } else {
        cb(null, results)
      }
    }
  )
}


module.exports = {
  getProductList,
  getSingleProduct,
  getSingleProductFeatures,
  getSingleProductStyles,
  getSingleProductPhotos


}