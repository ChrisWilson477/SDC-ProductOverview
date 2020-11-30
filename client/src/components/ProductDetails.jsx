import React from 'react';
import StarRatings from 'react-star-ratings';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon, EmailShareButton, EmailIcon } from 'react-share';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      MAWproductData: props.MAWproductData,
      MAWstylesData: props.MAWstylesData,
      MAWavgRating: props.MAWavgRating,
      quantityArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      selectedSize: 'Select Size',
      selectedSKU: '',
      selectedQuantity: 1,
      addedToCart: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.styleIndex !== this.props.styleIndex || prevProps.MAWproductData !== this.props.MAWproductData) {
      console.log('updating size/sku/quantity state');
      this.setState({selectedSize: 'Select Size', selectedSKU: '', selectedQuantity: 1, addedToCart: false});
    }
  }

  changeSize(e) {
    let sku = this.props.MAWstylesData.results[this.props.styleIndex].skus[e.target.value]
    let quantityArray = [];
    let maxQuantity = (sku < 15) ? sku : 15;
    for (let i = 1; i <= maxQuantity; i++) {
      quantityArray.push(i);
    }
    this.setState({selectedSKU: sku, selectedSize: e.target.value, quantityArray: quantityArray})
  }

  changeQuantity(e) {
    this.setState({selectedQuantity: e.target.value});
  }

  changeStyleIndex(e) {
    // this.setState({styleIndex: JSON.parse(e.target.alt)})
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
      this.setState({addedToCart: true})
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.props.MAWproductData === undefined || this.props.MAWavgRating === undefined) {
      return <div>Loading...</div>
    } else {
      let original_price, sale_price;
      if (this.props.MAWstylesData.results[this.props.styleIndex].sale_price > 0) {
        original_price = <div style={{textDecorationLine: 'line-through'}}>${this.props.MAWstylesData.results[this.props.styleIndex].original_price} </div>
        sale_price = <div className='ml-3' style={{color: 'red'}}> ${this.props.MAWstylesData.results[this.props.styleIndex].sale_price}</div>
      } else {
        original_price = <div>${this.props.MAWstylesData.results[this.props.styleIndex].original_price}</div>
        sale_price = <div></div>
      }

      let styleArray = this.props.MAWstylesData.results.map(styleObj => {
          let borderStyle = {width: 60, height: 60, borderRadius: '30px', border: '2px solid black'};
          let index = this.props.MAWstylesData.results.indexOf(styleObj)
          if (this.props.styleIndex === this.props.MAWstylesData.results.indexOf(styleObj)) {
            borderStyle = {width: 60, height: 60, borderRadius: '30px', border: '2px solid green'};
          };
          return <img className='mt-2 mb-2 mr-2' alt={index} style={borderStyle} src={styleObj.photos[0].thumbnail_url} onClick={(e)=>this.changeStyleIndex(e)}/>
        })

      let firstThumbnail = styleArray[0] ? styleArray[0] : null
      let secondThumbnail = styleArray[1] ? styleArray[1] : null
      let thirdThumbnail = styleArray[2] ? styleArray[2] : null
      let fourthThumbnail = styleArray[3] ? styleArray[3] : null
      let fifthThumbnail = styleArray[4] ? styleArray[4] : null
      let sixthThumbnail = styleArray[5] ? styleArray[5] : null
      let seventhThumbnail = styleArray[6] ? styleArray[6] : null
      let eigthThumbnail = styleArray[7] ? styleArray[7] : null
      let ninethThumbnail = styleArray[8] ? styleArray[8] : null
      let tenthThumbnail = styleArray[9] ? styleArray[9] : null
      let eleventhThumbnail = styleArray[10] ? styleArray[10] : null
      let twelvthThumbnail = styleArray[11] ? styleArray[11] : null
      let thirteenthThumbnail = styleArray[12] ? styleArray[12] : null
      let fourteenthThumbnail = styleArray[13] ? styleArray[13] : null
      let fifteenthThumbnail = styleArray[14] ? styleArray[14] : null
      let sixteenthThumbnail = styleArray[15] ? styleArray[15] : null
      let seventeethThumbnail = styleArray[16] ? styleArray[16] : null
      let eighteenthThumbnail = styleArray[17] ? styleArray[17] : null
      let nineteethThumbnail = styleArray[18] ? styleArray[18] : null
      let twentiethThumbnail = styleArray[19] ? styleArray[19] : null

      let mappedStyleThumbnails = <div><div>{firstThumbnail}{secondThumbnail}{thirdThumbnail}{fourthThumbnail}</div><div>{fifthThumbnail}{sixthThumbnail}{seventhThumbnail}{eigthThumbnail}</div><div>{ninethThumbnail}{tenthThumbnail}{eleventhThumbnail}{twelvthThumbnail}</div><div>{thirteenthThumbnail}{fourteenthThumbnail}{fifteenthThumbnail}{sixteenthThumbnail}</div><div>{seventeethThumbnail}{eighteenthThumbnail}{nineteethThumbnail}{twentiethThumbnail}</div></div>

      let sizesSelector = (Object.keys(this.props.MAWstylesData.results[this.props.styleIndex].skus)[0] !== 'null') ?
        (<select className='mr-3' onChange={(e)=>this.changeSize(e)} value={this.state.selectedSize}>
          <option>Select Size</option>
          {Object.keys(this.props.MAWstylesData.results[this.props.styleIndex].skus).map(size => {
          return <option value={size}>{size}</option>
        })}
        </select>) :
        <div className='mr-3' style={{color: 'red'}}>Item Out Of Stock</div>

      let quantitySelector = (this.state.selectedSize !== 'Select Size') ?
        <select onChange={(e)=>this.changeQuantity(e)} value={this.state.selectedQuantity}>
          <option>Select Quantity</option>
          {this.state.quantityArray.map(num => {
            return <option value={num}>{num}</option>
          })}
        </select> :
        <select onChange={(e)=>this.changeQuantity(e)} value='Select Quantity' disabled>
          <option>Select Quantity</option>
          {this.state.quantityArray.map(num => {
            return <option value={num}>{num}</option>
          })}
        </select>

      let addToCartButton;
      if (this.state.addedToCart === false) {
        addToCartButton = (this.state.selectedSize !== 'Select Size') ?
        <button className='addToCart' onClick={(e)=>this.addToCart(e)}>Add To Cart</button> :
        <div></div>
      } else {
        addToCartButton = (this.state.selectedSize !== 'Select Size') ?
        <div><button className='addToCart' onClick={(e)=>this.addToCart(e)}>Add To Cart</button><div style={{color: 'red'}}> Added To Cart!</div></div> :
        <div></div>
      }

      return (
        <div>
          <StarRatings rating={this.props.MAWavgRating} starRatedColor='black' numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px"/>
          <div>Category: {this.props.MAWproductData.category}</div>
          <h2>{this.props.MAWproductData.name}</h2>
          <Container>
            <Row>
              {original_price}
              {sale_price}
            </Row>
          </Container>
          <div>Style: {this.props.MAWstylesData.results[this.props.styleIndex].name}</div>
          <Container>
            <Row>
              {mappedStyleThumbnails}
            </Row>
          </Container>
          <Container>
            <Row className='mt-4 mb-4'>
                {sizesSelector}
                {quantitySelector}
            </Row>
            <Row className='mt-3 mb-3'>
                {addToCartButton}
            </Row>
            <Row className='mt-3 mb-3'>
              <FacebookShareButton
                url={"http://18.219.69.17/5"}
                quote={`${this.props.MAWstylesData.results[this.props.styleIndex].name}`}
                hashtag="#nKingsStyle">
                 <FacebookIcon size={36} />
              </FacebookShareButton>
              <TwitterShareButton
                url={"http://18.219.69.17/5"}
                title={`${this.props.MAWstylesData.results[this.props.styleIndex].name}`}
                via='nKings'
                hashtags={["#nKingsStyle"]}>
                  <TwitterIcon size={36} />
              </TwitterShareButton>
              <PinterestShareButton
                url={"http://18.219.69.17/5"}
                media={`${this.props.MAWstylesData.results[this.props.styleIndex].photos[0].url}`}
                description={`${this.props.MAWstylesData.results[this.props.styleIndex].name}`}>
                  <PinterestIcon size={36} />
              </PinterestShareButton>
              <EmailShareButton
                url={"http://18.219.69.17/5"}
                subject={`${this.props.MAWstylesData.results[this.props.styleIndex].name}`}
                body='Buy this product!'>
                  <EmailIcon size={36} />
              </EmailShareButton>
            </Row>
          </Container>
        </div>
      );
    }
  }
}


export default ProductDetails;