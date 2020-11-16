import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const ProductPictures = function(props) {
  if (props.MAWstylesData === undefined) {
    return (<div>Loading...</div>);
  }
  // <div className='ProductPictures'>Product Paragraph for Product: {props.MAWproductID}</div>
  return (
    <img style={{width: 500, height: 'auto'}} src={props.MAWstylesData.results[0].photos[0].url} />
  );
}

export default ProductPictures;