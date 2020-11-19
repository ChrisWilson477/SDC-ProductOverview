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
              <button type="button" className="btn btn-info">
                <span className="glyphicon glyphicon-search"></span> Search
              </button>
            </form>
          </Col>
        </Row >
        <Row>
          <div className='text-right' style={{fontSize: "14px"}}>Deals! Deals! Deals! We Have the Best Deals! Very Special Price for You! -- Click <a href="javascript:alert('Just Kidding!');" className='font-weight-bold'>HERE</a> for 1% Off Discount Code!
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Header;