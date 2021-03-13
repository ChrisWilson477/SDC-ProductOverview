
const postgres = require('postgres');
const { Pool } = require('pg');
let postgresConfig = require('./config.js');
const pool =  new Pool(postgresConfig);


const db = require('./queries');

let list = db.getProductList();
list.then((rows) => {
  console.log(rows);
})



pool.end()



