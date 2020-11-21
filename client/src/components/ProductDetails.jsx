import React from 'react';
import StarRatings from 'react-star-ratings';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      MAWproductData: props.MAWproductData,
      MAWstylesData: props.MAWstylesData,
      MAWavgRating: props.MAWavgRating,
      quantityArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedSize: '',
      selectedSKU: '',
      selectedQuantity: 0,
      styleIndex: 0
    }
  }

  changeSize(e) {
    let sku = this.props.MAWstylesData.results[this.state.styleIndex].skus[e.target.value]
    this.setState({selectedSKU: sku, selectedSize: e.target.value})
  }

  changeQuantity(e) {
    this.setState({selectedQuantity: e.target.value});
  }

  changeStyleIndex(e) {
    this.setState({styleIndex: JSON.parse(e.target.alt)})
    this.props.handleStyleIndexChange(JSON.parse(e.target.alt));
  }

  addToCart(e) {
    console.log('adding to cart');
    fetch('http://52.26.193.201:3000/cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"user_session": "1",
             "product_id": `${this.props.MAWproductData.id}`})
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.props.MAWproductData === undefined || this.props.MAWavgRating === undefined) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <StarRatings rating={this.props.MAWavgRating} starRatedColor='black' numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px"/>
          <div>Category: {this.props.MAWproductData.category}</div>
          <h2>{this.props.MAWproductData.name}</h2>
          <div>${this.props.MAWstylesData.results[this.state.styleIndex].original_price}</div>
          <div>Style: {this.props.MAWstylesData.results[this.state.styleIndex].name}</div>
          <Container>
            <Row>
              {this.props.MAWstylesData.results.map((styleObj) => {
                let borderStyle = 'border border-dark mt-2 mb-2 mr-2 rounded-circle';
                let index = this.props.MAWstylesData.results.indexOf(styleObj)
                if (this.state.styleIndex === this.props.MAWstylesData.results.indexOf(styleObj)) {
                  borderStyle = 'border border-success mt-2 mb-2 mr-2 rounded-circle'
                };
                return <img className={borderStyle} alt={index} style={{width: 60, height: 60}} src={styleObj.photos[0].thumbnail_url} onClick={(e)=>this.changeStyleIndex(e)}/>
              })}
            </Row>
          </Container>
          <Container>
            <Row className='mt-4 mb-4'>
                <select className='mr-3' onChange={(e)=>this.changeSize(e)}>
                  <option>Select Size</option>
                  {Object.keys(this.props.MAWstylesData.results[this.state.styleIndex].skus).map(size => {
                    return <option value={size}>{size}</option>
                  })}
                </select>
                <select onChange={(e)=>this.changeQuantity(e)}>
                  <option>Select Quantity</option>
                  {this.state.quantityArray.map(num => {
                    return <option value={num}>{num}</option>
                  })}
                </select>
            </Row>
            <Row className='mt-3 mb-3'>
                <button className='addToCart' onClick={(e)=>this.addToCart(e)}>Add To Cart</button>
            </Row>
          </Container>
        </div>
      );
    }
  }
}


export default ProductDetails;