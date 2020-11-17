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
    let sku = this.state.MAWstylesData.results[this.state.styleIndex].skus[e.target.value]
    this.setState({selectedSKU: sku, selectedSize: e.target.value})
  }

  changeQuantity(e) {
    this.setState({selectedQuantity: e.target.value});
  }

  changeStyleIndex(e) {
    this.setState({styleIndex: JSON.parse(e.target.alt)});
  }

  addToCart(e) {
    console.log('adding to cart');
    //POST request not working
    fetch(`http://52.26.193.201:3000/cart/1/${this.state.MAWproductData.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.state.MAWproductData === undefined || this.state.MAWavgRating === undefined) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <StarRatings rating={this.state.MAWavgRating} starRatedColor='black' numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px"/>
          <div>Category: {this.state.MAWproductData.category}</div>
          <h2>{this.state.MAWproductData.name}</h2>
          <div>${this.state.MAWstylesData.results[this.state.styleIndex].original_price}</div>
          <div>Style: {this.state.MAWstylesData.results[this.state.styleIndex].name}</div>
          <Container>
            <Row>
              {this.state.MAWstylesData.results.map((styleObj) => {
                let borderStyle = 'border border-dark mt-2 mb-2 mr-2 rounded-circle';
                let index = this.state.MAWstylesData.results.indexOf(styleObj)
                if (this.state.styleIndex === this.state.MAWstylesData.results.indexOf(styleObj)) {
                  borderStyle = 'border border-success mt-2 mb-2 mr-2 rounded-circle'
                };
                return <img className={borderStyle} alt={index} style={{width: 60, height: 60}} src={styleObj.photos[0].thumbnail_url} onClick={(e)=>this.changeStyleIndex(e)}/>
              })}
            </Row>
          </Container>
          <Container>
            <Row>
              <Col className='mt-2 mr-2 mb-2'>
                <select onChange={(e)=>this.changeSize(e)}>
                  <option>Select Size</option>
                  {Object.keys(this.state.MAWstylesData.results[this.state.styleIndex].skus).map(size => {
                    return <option value={size}>{size}</option>
                  })}
                </select>
              </Col>
              <Col className='mt-2 mr-2 mb-2'>
                <select onChange={(e)=>this.changeQuantity(e)}>
                  <option>Select Quantity</option>
                  {this.state.quantityArray.map(num => {
                    return <option value={num}>{num}</option>
                  })}
                </select>
              </Col>
            </Row>
            <Row>
              <Col className='mt-2 mr-2 mb-2'>
                <button className='addToCart' onClick={(e)=>this.addToCart(e)}>Add To Cart</button>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}


export default ProductDetails;