const fs = require('fs');
const faker = require('faker');


const writeProducts = fs.createWriteStream('products.csv');



//Product


function writeTenMillionProducts(writer, encoding, callback) {
  let i = 1000000;
  let id = 0;
  let start = Date.now();
  console.log('#:', id);
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let name = faker.commerce.productName();
      let slogan = faker.lorem.sentence();
      let description = faker.lorem.sentences(2);
      let category = faker.commerce.product();
      let default_price = faker.commerce.price(2, 1000, 2, '$');
      let features = [
        JSON.stringify({
          feature: faker.commerce.product(),
          value: faker.commerce.productMaterial()
        })];


      const data = `${id},${name},${slogan}, ${description}, ${category}, ${default_price}, ${features}\n`;

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
  let end = Date.now();
  console.log(`Execution time: ${end - start} ms`);
}



writeTenMillionProducts(writeProducts, 'utf-8', () => {
  writeProducts.end();
});


