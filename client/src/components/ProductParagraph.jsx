import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const ProductParagraph = function(props) {
  return (
    <div>
      <b className='ProductSlogan'>{props.MAWproductSlogan}</b>
      <div className='ProductParagraph'>{props.MAWproductDescription}</div>
    </div>
  );
}

export default ProductParagraph;