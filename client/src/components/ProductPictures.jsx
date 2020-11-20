import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class ProductPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPicture: 0,
      vertCarouselStartIndex: 0,
      zoom: false
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
  leftClick(e) {
    e.preventDefault();
    var previousPicture = this.state.selectedPicture;
    if (previousPicture === this.state.vertCarouselStartIndex) {
      this.setState({vertCarouselStartIndex: (previousPicture - 1)});
    }
    this.setState({selectedPicture: (previousPicture - 1)})
  }
  rightClick(e) {
    e.preventDefault();
    var previousPicture = this.state.selectedPicture;
    if (previousPicture === this.state.vertCarouselStartIndex + 6) {
      let nextVertCarouselStartIndex = this.state.vertCarouselStartIndex + 1;
      this.setState({vertCarouselStartIndex: nextVertCarouselStartIndex})
    }
    this.setState({selectedPicture: (previousPicture + 1)})
  }
  //If the user hovers over the main image anywhere other than the thumbnails, the left arrow, or the right arrow, the mouse icon should change to show a magnifying glass.  If the user clicks on the image, the image gallery should change to the expanded view.
  zoomIn(e) {
    e.preventDefault();
    this.setState({zoom: true})
  }
  zoomOut(e) {
    e.preventDefault();
    this.setState({zoom: false});
  }

  render() {
    if (this.props.MAWstylesData === undefined || this.props.styleIndex === undefined) {
      return (<div>Loading...</div>);
    }
    var leftChevron, rightChevron;
    if (this.state.selectedPicture !== 0) {
      leftChevron = <div className="glyphicon glyphicon-chevron-left" style={{position: 'absolute', top: `150px`, left: '65px', width: '10px', height: '10px', zIndex: '2', color: 'white'}} onClick={(e)=>{this.leftClick(e)}}></div>
    } else {
      leftChevron = null;
    }
    if (this.state.selectedPicture !== (this.props.MAWstylesData.results[this.props.styleIndex].photos.length - 1)) {
      rightChevron = <div className="glyphicon glyphicon-chevron-right" style={{position: 'absolute', top: `150px`, right: '10px', width: '10px', height: '10px', zIndex: '2', color: 'white'}} onClick={(e)=>{this.rightClick(e)}}></div>
    } else {
      rightChevron = null;
    }
    var zoomedPicture;
    if (this.state.zoom === true) {
      zoomedPicture = <div>
                        <img style={{position: 'absolute', top: '10px', left: '10px', width: '1200px', height: 'auto', zIndex: '3'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].url}/>
                        <div className="glyphicon glyphicon-zoom-out" style={{display: 'inline-block', position: 'absolute', top: '20px', left: '1160px', zIndex: '3', color: 'white', fontSize: '40px'}} onClick={(e)=>{this.zoomOut(e)}}></div>
                      </div>
    } else {
      zoomedPicture = null;
    }

    return (
      <div className='text-center' style={{position: 'relative'}}>
        <img className='img-fluid' style={{position: 'absolute', top: '0px', left: '0px'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].url} />
        {this.props.MAWstylesData.results[this.props.styleIndex].photos.map(picObj => {
          let index = this.props.MAWstylesData.results[this.props.styleIndex].photos.indexOf(picObj);
          let result;
          if (index > (6 + this.state.vertCarouselStartIndex) || index < this.state.vertCarouselStartIndex) {
            return;
          }
          let top = JSON.stringify(((index - this.state.vertCarouselStartIndex) * 50) + 20);
            if (index > (5 + this.state.vertCarouselStartIndex) && index !== this.props.MAWstylesData.results[this.props.styleIndex].photos.length) {
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
                <div>
                  <img className='border border-light' alt={index} style={{position: 'absolute', top: `${top}px`, left: '20px', width: '40px', height: '40px', zIndex: '2'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[index].thumbnail_url} onClick={(e)=>{this.thumbnailClick(e)}}/>
                </div>
              )
            }
        })
        }
        {this.props.MAWstylesData.results[this.props.styleIndex].photos.map((picObj) => {
          let index = this.props.MAWstylesData.results[this.props.styleIndex].photos.indexOf(picObj);
          if (index === JSON.parse(this.state.selectedPicture) && index >= this.state.vertCarouselStartIndex && index <= (this.state.vertCarouselStartIndex + 6)) {
            let top = JSON.stringify(((index - this.state.vertCarouselStartIndex) * 50) + 62);
            return (
              <div className='rectangle' style={{display: 'inline-block', position: 'absolute', top: `${top}px`, left: '20px', width: '40px', height: '3px', zIndex: '2', background: 'white'}}></div>
            );
          }
        })
        }
        <div className="glyphicon glyphicon-zoom-in" style={{display: 'inline-block', position: 'absolute', top: '20px', right: '20px', zIndex: '2', color: 'white', fontSize: '40px'}} onClick={(e)=>{this.zoomIn(e)}}></div>
        {leftChevron}
        {rightChevron}
        {zoomedPicture}
      </div>
    );
  }
}

export default ProductPictures;