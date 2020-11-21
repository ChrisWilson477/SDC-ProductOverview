import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: 5
    };
  }

  setSearchInput(e) {
    e.preventDefault();
    console.log(e);
    this.setState({searchInput: e.target.value})
  }
  changeProductID(e) {
    e.preventDefault();
    this.props.handleProductChange(this.state.searchInput);
  }

  render() {
    if (this.props.handleProductChange === undefined) {
      return <div>Loading...</div>
    } else {
    return (
      <div>
        <Container>
          <Row className='mb-2' style={{backgroundColor: '#454647'}}>
            <Col className='font-weight-bold' style={{fontSize: "28px", textAlign: 'left', fontStyle: 'italic', textDecorationLine: 'underline', color: 'white'}}>nKings</Col>
            <Col className='mt-2 mb-2' style={{textAlign: 'right'}}>
              <form>
                <input type='number' name='searchID' placeholder='Search' onChange={(e)=>{this.setSearchInput(e)}}/>
                <div className='glyphicon glyphicon-search ml-2' style={{position: 'relative', top: '5px', zIndex: '2', color: 'white', fontSize: '20px'}} onClick={(e)=>{this.changeProductID(e)}}></div>
              </form>
            </Col>
          </Row >
          <Row style={{textAlign: 'center'}}>
            <div className='' style={{fontSize: "14px", textAlign: 'center'}}>Deals! Deals! Deals! We Have the Best Deals! Very Special Price for You! -- Click <a href="javascript:alert('Just Kidding!');" className='font-weight-bold'>HERE</a> for 1% Off Discount Code!
            </div>
          </Row>
        </Container>
      </div>
    );
  }}
}
{/* <div className='glyphicon glyphicon-search' style={{display: 'inline-block', position: 'absolute', top: '20px', right: '20px', zIndex: '2', color: 'white', fontSize: '40px', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'}}></div> */}
export default Header;