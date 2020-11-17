import React from 'react';
import {render, cleanup, screen} from '@testing-library/react';
import App from './App.jsx';
import ProductDetails from './components/ProductDetails.jsx';



//Product Details Unit Tests
describe('Testing Product Details and Each Sub-Component', () => {
  afterEach(cleanup);

  test('Renders Overall Product Details Component', () => {
    render();
  });
  test('Renders Product Avg Rating', () => {
    render();
  });
  test('Renders Product Catgory', () => {
    render();
  });
  test('Renders Product Name', () => {
    render();
  });
  test('Renders Product Price', () => {
    render();
  });
  test('Renders Style Name', () => {
    render();
  });
  test('Renders Correct Number of Thumbnail Pics', () => {
    render();
  });
  test('Renders Correct Thumbnail Pic', () => {
    render();
  });
  test('Clicking Thumbnail Correctly Changes Style Index State', () => {
    render();
  });
  test('Renders DropDown Size List', () => {
    render();
  });
  test('DropDown Size List Correctly Changes Size State', () => {
    render();
  });
  test('Renders DropDown Quantity List', () => {
    render();
  });
  test('DropDown Quantity List Correctly Changes Quantity State', () => {
    render();
  });
  test('Renders Add To Cart Button', () => {
    render();
  });
});