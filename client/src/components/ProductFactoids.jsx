import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const ProductFactoids = function(props) {
  return (
    <div>
      {props.MAWproductFactoids.map(feature => {
        return <div>&#10003; {feature.value} {feature.feature}</div>
      })}
    </div>
  );
}

export default ProductFactoids;