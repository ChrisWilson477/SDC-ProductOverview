// server.jsx
const express = require('express');
var db = require('../database-postgres');
const app = express();
const PORT = 3002;

app.use(express.static('../client/dist')); // Host your dist folder up to the server
app.use(express.json()); // Alternative to BodyParser



app.get('/products/list', (req, res) => {
  db.getProductList((err, results, fields) => {
		if(err) {
			res.status(500).send(`Error in the GET request: ${err}`);
		} else {
			res.status(200).send(results);
		}
	})
}


app.get('/products/:product_id', (req, res) => {
	let reqParams = req.params.id;
	db.getSingleProduct(reqParams, (err, results, fields) => {
		if(err) {
			res.status(500).send(`Error in the GET request: ${err}`);
		} else {
			res.status(200).send(results);
		}
	})
}


app.get('/products/:product_id', (req, res) => {
	let reqParams = req.params.id;
	db.getSingleProductFeatures(reqParams, (err, results, fields) => {
		if(err) {
			res.status(500).send(`Error in the GET request: ${err}`);
		} else {
			res.status(200).send(results);
		}
	})
}

app.get('/products/:product_id/styles', (req, res) => {
	let reqParams = req.params.id;
	db.getSingleProductStyles(reqParams, (err, results, fields) => {
		if(err) {
			res.status(500).send(`Error in the GET request: ${err}`);
		} else {
			res.status(200).send(results);
		}
	})
}

app.get('/products/:product_id/styles', (req, res) => {
	let reqParams = req.params.id;
	db.getSingleProductPhotos(reqParams, (err, results, fields) => {
		if(err) {
			res.status(500).send(`Error in the GET request: ${err}`);
		} else {
			res.status(200).send(results);
		}
	})
}


// Listening for requests on the PORT
app.listen(PORT, () => {
    console.log('Serving up now at '+ JSON.stringify(PORT))
});
