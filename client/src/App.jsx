import React from 'react';
import helperFunctions from './HelperFunctions.js';
import ProductParagraph from './components/ProductParagraph.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import ProductPictures from './components/ProductPictures.jsx';
import ProductFactoids from './components/ProductFactoids.jsx';
import StarRatings from 'react-star-ratings';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            MAWcurrentProduct: 5,
            MAWproductData: {},
            MAWstylesData: {},
            MAWavgRating: -1
        };
    }
    componentDidMount() {
        fetch('http://52.26.193.201:3000/products/5')
            .then(data => {
            return data.json();
            })
            .then(data => {
                console.log(data);
                this.setState({MAWproductData: data})
            })
            .then(() => {
                fetch('http://52.26.193.201:3000/products/5/styles')
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    console.log(data);
                    this.setState({MAWstylesData: data})
                })
                .then(() => {
                    fetch(`http://52.26.193.201:3000/reviews/${this.state.MAWproductData.id}/meta`)
                    .then(data => {
                        return data.json();
                    })
                    .then(data => {
                        //Calculating Avg Rating from reviews
                        var numOfRatings = 0;
                        var totalStars = 0;
                        for (var ratingKey in data.ratings) {
                          numOfRatings += data.ratings[ratingKey];
                          totalStars += (ratingKey * data.ratings[ratingKey]);
                        }
                        if(numOfRatings !== 0) {
                          return (totalStars / numOfRatings);
                        } else {
                          return 0;
                        }
                    })
                    .then(rating => {
                        this.setState({MAWavgRating: rating});
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
            console.log(err);
            })
    }

    render() {
        if (this.state.MAWavgRating === -1) {
            return (<div>Loading...</div>)
        }
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="block-example border border-dark mt-5"><ProductPictures MAWstylesData={this.state.MAWstylesData} /></Col>
                        <Col sm={{ span: 5, offset: 1 }} className="block-example border border-dark mt-5"><ProductDetails MAWproductData={this.state.MAWproductData} MAWstylesData={this.state.MAWstylesData} MAWavgRating={this.state.MAWavgRating}/></Col>
                    </Row>
                    <Row>
                        <Col className="block-example mt-5"><ProductParagraph MAWproductSlogan={this.state.MAWproductData.slogan} MAWproductDescription={this.state.MAWproductData.description}/></Col>
                        <Col sm={{ span: 5, offset: 1 }} className="block-example border border-dark mt-5"><ProductFactoids MAWproductID={this.state.MAWcurrentProduct} /></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;

//****Greenfield API info below****

// The API can currently be found at http://52.26.193.201:3000/ For example: http://52.26.193.201:3000/products/list.
// In an HTTP GET request, parameters are sent as a query string:

// http://example.com/page?parameter=value&also=another

// In an HTTP POST or PUT request, the parameters are not sent along with the URI, but in the request body. Parameters noted for each route below follow this standard.

/**Specific Routes for Product Detail portion**
 * POST to '/cart/' with params (user_session - integer, product_id - integer) with 201 response code
 * POST to '/interactions/' with params (element - string, widget - string, time - string) with 201 or 422 reponse codes
 *      -should need for the 'star' widget next to 'add to bag' button
 * GET '/products/:product_id' with params (product_id - integer) with 200 response code
 * GET /products/:product_id/styles with params (product_id - integer) with 200 response code
 *      -includes pictures, sizes,
 * */

