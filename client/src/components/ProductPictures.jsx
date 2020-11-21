import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class ProductPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPicture: 0,
      vertCarouselStartIndex: 0,
      zoom: false,
      expandedViewXY: {
        hoverX: 0,
        hoverY: 0,
        offsetX: 0,
        offsetY: 0,
        expandedWidth: 0,
        expandedHeight: 0
      }
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
    this.setState({selectedPicture: (JSON.parse(previousPicture) + 1)});
  }
  zoomIn(e) {
    e.preventDefault();
    this.setState({zoom: true})
  }
  zoomOut(e) {
    e.preventDefault();
    this.setState({zoom: false});
  }
  expandedViewXY(e) {
    e.preventDefault();
    console.log(e);
    console.log('hovering');
    this.setState({expandedViewXY: {
      hoverX: e.clientX,
      hoverY: e.clientY,
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
      expandedWidth: e.target.clientWidth,
      expandedHeight: e.target.clientHeight
    }}, () => {
      console.log('x: ' + this.state.expandedViewXY.hoverX + ' and y: ' + this.state.expandedViewXY.hoverY);
      console.log('Ox: ' + this.state.expandedViewXY.offsetX + ' and Oy: ' + this.state.expandedViewXY.offsetY);
      console.log('clientW: ' + this.state.expandedViewXY.expandedWidth + ' and clientH: ' + this.state.expandedViewXY.expandedHeight);
    });
  }
  render() {
    if (this.props.MAWstylesData === undefined || this.props.styleIndex === undefined) {
      return (<div>Loading...</div>);
    }
    var leftChevron, rightChevron;
    if (this.state.selectedPicture !== 0) {
      leftChevron = <div className="glyphicon glyphicon-chevron-left" style={{position: 'absolute', top: `150px`, left: '65px', width: '10px', height: '10px', zIndex: '2', color: 'white', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black', fontSize: '25px'}} onClick={(e)=>{this.leftClick(e)}}></div>
    } else {
      leftChevron = null;
    }
    if (this.state.selectedPicture !== (this.props.MAWstylesData.results[this.props.styleIndex].photos.length - 1)) {
      rightChevron = <div className="glyphicon glyphicon-chevron-right" style={{position: 'absolute', top: `150px`, right: '20px', width: '10px', height: '10px', zIndex: '2', color: 'white', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black', fontSize: '25px'}} onClick={(e)=>{this.rightClick(e)}}></div>
    } else {
      rightChevron = null;
    }
    var zoomedPicture;
    if (this.state.zoom === true) {
      zoomedPicture = <div>
                        <img style={{position: 'absolute', top: '10px', left: '10px', maxWidth: '800px', maxHeight: '800px', zIndex: '3', cursor: 'zoom-out'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].url} onClick={(e)=>{this.zoomOut(e)}} onMouseMove={(e)=>{this.expandedViewXY(e)}}/>
                        <div style={{display: 'inline-block', position: 'fixed', top: `${this.state.expandedViewXY.hoverY - 30}px`, left: `${this.state.expandedViewXY.hoverX - 30}px`, width: '60px', height: '60px', zIndex: '4', border: '1px solid #d4d4d4', cursor: 'zoom-out'}} onClick={(e)=>{this.zoomOut(e)}} onMouseMove={(e)=>{this.expandedViewXY(e)}}></div>
                        <div style={{position: 'relative'}}>
                          <div style={{display: 'inline-block', position: 'absolute', top: '-350px', right: '-475px', width: '300px', height: '300px', zIndex: '5', border: '1px solid #d4d4d4', backgroundImage: `url(${this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].url})`, backgroundSize: `${this.state.expandedViewXY.expandedWidth * 5}px + ${this.state.expandedViewXY.expandedHeight * 5}px`, backgroundPosition: `-${(this.state.expandedViewXY.offsetX - 60)*2}px -${(this.state.expandedViewXY.offsetY - 60)*2}px`}}></div>
                        </div>
                      </div>
    } else {
      zoomedPicture = null;
    }
    //nativeEvent.layerX or .layerY or .offsetX or .offsetY, 5x magnification
    //target.clientWidth or target.clientHeight
//calculate relative coordinates of cursor on picture
//
    return (
      <div>
      <div className='text-center' style={{position: 'relative'}}>
        <img className='img-fluid' style={{position: 'static', top: '0px', left: '0px', maxHeight: '500px', cursor: 'zoom-in'}} src={this.props.MAWstylesData.results[this.props.styleIndex].photos[this.state.selectedPicture].url} onClick={(e)=>{this.zoomIn(e)}}/>
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
                  <div className="glyphicon glyphicon-chevron-down" style={{position: 'absolute', top: `${JSON.stringify(JSON.parse(top) + 43)}px`, left: '33px', width: '10px', height: '10px', zIndex: '2', color: 'white', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'}} onClick={(e)=>{this.downClick(e)}}></div>
                </div>
              )
            } else if (index === this.state.vertCarouselStartIndex && this.state.vertCarouselStartIndex !== 0) {
              return (
                <div>
                  <div className="glyphicon glyphicon-chevron-up" style={{position: 'absolute', top: `3px`, left: '33px', width: '10px', height: '10px', zIndex: '2', color: 'white', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'}} onClick={(e)=>{this.upClick(e)}}></div>
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
        {/* <div className="glyphicon glyphicon-zoom-in" style={{display: 'inline-block', position: 'absolute', top: '20px', right: '20px', zIndex: '2', color: 'white', fontSize: '40px', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'}} ></div> */}
        {leftChevron}
        {rightChevron}
        {zoomedPicture}
      </div>
      </div>
    );
  }
}

export default ProductPictures;