import React from 'react';
import helperFunctions from './HelperFunctions.js';
import ProductParagraph from './components/ProductParagraph.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import ProductPictures from './components/ProductPictures.jsx';
import ProductFactoids from './components/ProductFactoids.jsx';
import Header from './components/Header.jsx';
import StarRatings from 'react-star-ratings';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class ProductOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            MAWcurrentProduct: 5,
            MAWproductData: {},
            MAWstylesData: {},
            MAWavgRating: -1,
            styleIndex: 0
        };
        this.handleStyleIndexChange.bind(this);
        this.handleProductChange.bind(this);
    }
    componentDidMount() {
        this.getProductData(this.state.MAWcurrentProduct);
    }

    getProductData(id) {
        fetch(`http://52.26.193.201:3000/products/${id}`)
            .then(data => {
            return data.json();
            })
            .then(data => {
                this.setState({MAWproductData: data})
            })
            .then(() => {
                fetch(`http://52.26.193.201:3000/products/${id}/styles`)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    this.setState({MAWstylesData: data})
                })
                .then(() => {
                    fetch(`http://52.26.193.201:3000/reviews/${id}/meta`)
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

    handleStyleIndexChange(index) {
        console.log('changing style');
        console.log(index);
        this.setState({styleIndex: index})
    }

    handleProductChange(id) {
        console.log(id);
        this.getProductData(id);
        // this.setState({MAWcurrentProduct: id});
    }

    render() {
        if (this.state.MAWavgRating === -1) {
            return (<div>Loading...</div>)
        }
        return (
            <div>
                <Container className='mb-4'>
                    <Col sm={{ span: 12 }} className=""><Header MAWproductData={this.state.MAWproductData} handleProductChange={this.handleProductChange.bind(this)}/></Col>
                </Container>
                <Container>
                    <Row className=''>
                        <Col className=''><ProductPictures MAWstylesData={this.state.MAWstylesData} styleIndex={this.state.styleIndex}/></Col>
                        <Col sm={{ span: 5, offset: 0 }} className=""><ProductDetails MAWproductData={this.state.MAWproductData} MAWstylesData={this.state.MAWstylesData} MAWavgRating={this.state.MAWavgRating} handleStyleIndexChange={this.handleStyleIndexChange.bind(this)}/></Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col className=''><ProductParagraph MAWproductSlogan={this.state.MAWproductData.slogan} MAWproductDescription={this.state.MAWproductData.description}/></Col>
                        <Col sm={{ span: 5, offset: 0 }} className="border-left border-dark"><ProductFactoids MAWproductFactoids={this.state.MAWproductData.features} /></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ProductOverview;