import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Header = function(props) {
  return (
    <div>
      <Container>
        <Row className='' style={{backgroundColor: '#454647'}}>
          <Col className='font-weight-bold' style={{fontSize: "28px", textAlign: 'left', fontStyle: 'italic', textDecorationLine: 'underline', color: 'white'}}>nKings</Col>
          <Col className='mt-2 mb-2 mr-2' style={{textAlign: 'right'}}>
            <form>
              <input type='text' name='searchID' placeholder='Search'/>
              <button type="button" class="btn btn-info">
                <span class="glyphicon glyphicon-search"></span> Search
              </button>
            </form>
          </Col>
        </Row>
          <span className='text-center size=xxl' style={{fontSize: "14px", textAlign: 'center'}}>Deal! Deals! Deal! We Have the Best Deals! Very Special Price for You! -- Click <a href="javascript:alert('Just Kidding!');" className='font-weight-bold'>HERE</a> for 1% Off!</span>
      </Container>
    </div>
  );
}

export default Header;