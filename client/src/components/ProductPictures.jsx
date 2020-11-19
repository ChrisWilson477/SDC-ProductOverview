import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class ProductPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPicture: 0,
      vertCarouselStartIndex: 0
    };
  }
  thumbnailClick(e) {
    e.preventDefault();
    this.setState({selectedPicture: e.target.alt})
  }
  upClick(e) {
    e.preventDefault();
    this.setState({vertCarouselStartIndex: this.state.vertCarouselStartIndex - 1});
  }
  downClick(e) {
    e.preventDefault();
    this.setState({vertCarouselStartIndex: this.state.vertCarouselStartIndex + 1});
  }

  render() {
    if (this.props.MAWstylesData === undefined || this.props.styleIndex === undefined) {
      return (<div>Loading...</div>);
    }
    return (
      <div className='text-center' style={{position: 'relative'}}>
        <img className='img-fluid' style={{position: 'absolute', top: '0px', left: '0px'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].url} />
        {this.props.MAWstylesData.results[this.props.styleIndex].photos.map(picObj => {
          let index = this.props.MAWstylesData.results[this.props.styleIndex].photos.indexOf(picObj);
          let top = JSON.stringify((index * 50) + 20);
            if (index > (6 + this.state.vertCarouselStartIndex) || index < this.state.vertCarouselStartIndex) {
              return;
            } else if (index > (5 + this.state.vertCarouselStartIndex) || index !== this.props.MAWstylesData.results[this.props.styleIndex].photos.length) {
              return (
                <div>
                  <img className='border border-light' alt={index} style={{position: 'absolute', top: `${top}px`, left: '20px', width: '40px', height: '40px', zIndex: '2'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[index].thumbnail_url} onClick={(e)=>{this.thumbnailClick(e)}}/>
                  <div className="glyphicon glyphicon-chevron-down" style={{position: 'absolute', top: `${JSON.stringify(JSON.parse(top) + 43)}px`, left: '33px', width: '10px', height: '10px', zIndex: '2', color: 'white'}} onClick={(e)=>{this.downClick(e)}}></div>
                </div>
              )
            } else if (index === this.state.vertCarouselStartIndex && this.state.vertCarouselStartIndex !== 0) {
              return (
                <div>
                  <div className="glyphicon glyphicon-chevron-up" style={{position: 'absolute', top: `3px`, left: '33px', width: '10px', height: '10px', zIndex: '2', color: 'white'}} onClick={(e)=>{this.upClick(e)}}></div>
                  <img className='border border-light' alt={index} style={{position: 'absolute', top: `${top}px`, left: '20px', width: '40px', height: '40px', zIndex: '2'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[index].thumbnail_url} onClick={(e)=>{this.thumbnailClick(e)}}/>
                </div>
              )
            } else {
              return (
                <img className='border border-light' alt={index} style={{position: 'absolute', top: `${top}px`, left: '20px', width: '40px', height: '40px', zIndex: '2'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[index].thumbnail_url} onClick={(e)=>{this.thumbnailClick(e)}}/>
              )
            }
        })}
      </div>
    );
  }
}
{/* <img alt='up-arrow' style={{position: 'absolute', top: `15px`, left: '20px', width: '10px', height: '10px', zIndex: '2'}} src={'./images/299-2995279_chevron-small-up-comments-up-point-arrow.png'} onClick={(e)=>{this.upClick(e)}} /> */}
{/* <img className='border border-light' style={{position: 'absolute', top: '10px', left: '10px', width: '50px', height: '50px', zIndex: '2'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].thumbnail_url}/> */}
{/* <img className='img-fluid' src={this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].url} />
<div style={{position: 'relative', zIndex: '1'}}>Text</div> */}
// style={{maxWidth: 'auto', maxHeight: '360px', align}}  **alternate img formatting
export default ProductPictures;