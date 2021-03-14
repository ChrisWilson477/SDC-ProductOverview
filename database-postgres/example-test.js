
const postgres = require('postgres');
const { Pool } = require('pg');
let postgresConfig = require('./config.js');
const pool =  new Pool(postgresConfig);


const db = require('./queries');

let singleProd = db.getSingleProductStyles(5);
singleProd.then((rows) => {
  console.log(rows);
})



pool.end()



