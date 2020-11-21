import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Header = function(props) {
  return (
    <div>
      <Container>
        <Row className='mb-2' style={{backgroundColor: '#454647'}}>
          <Col className='font-weight-bold' style={{fontSize: "28px", textAlign: 'left', fontStyle: 'italic', textDecorationLine: 'underline', color: 'white'}}>nKings</Col>
          <Col className='mt-2 mb-2' style={{textAlign: 'right'}}>
            <form>
              <input type='number' name='searchID' placeholder='Search'/>
              <div className='glyphicon glyphicon-search ml-2' style={{position: 'relative', top: '5px', zIndex: '2', color: 'white', fontSize: '20px'}} onClick={()=>{console.log('clicked!')}}></div>
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
}
{/* <div className='glyphicon glyphicon-search' style={{display: 'inline-block', position: 'absolute', top: '20px', right: '20px', zIndex: '2', color: 'white', fontSize: '40px', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'}}></div> */}
export default Header;