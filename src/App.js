import React, { Component } from 'react';
import './App.css';

const batman = {
  src: 'http://www.minsteronline.co.uk/wp-content/uploads/2017/01/Minster-Briefing-Other.png',
  style: {width: "85px", cursor: "pointer", margin: "0px 10px"}
}

const captain = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Creative-Tail-People-superman.svg/2000px-Creative-Tail-People-superman.svg.png',
  style: {width: "85px", cursor: "pointer", margin: "0px 10px"}
}

export class Batman extends Component {
  render() {
    return(<img src={batman.src} style={batman.style} alt ='batman' onClick={this.props.onClick} />);
  }
}

export class Captain extends Component {
  render() {
    return(<img src={captain.src} style={captain.style} alt='captain' onClick={this.props.onClick} />);
  }
}

export class Heading extends Component {  
  render() {
    return(
      <div className='heading'>
        <h1>SUPERHEROES</h1>
        <h1>TIC TAC TOE</h1>
      </div>
    );
  }
}

export class ResetButton extends Component {
  render() {
    return(<button type="button" onClick={this.props.onClick}>Reset Game</button>);
  }
}

export class ChooseCharacters extends Component {
  render() {
    return(
      <h2>CHOOSE YOUR CHARACTER</h2>
    );
  }
}

const gridLine = 'thin dotted black';

const gridstyle = {
  td: { width: '100px', height: '100px', margin: '0'},
  left: { 'border-right': gridLine, 'border-bottom': gridLine },
  center: { 'border-bottom': gridLine },
  right: { 'border-left': gridLine, 'border-bottom': gridLine },
  bottomLeft: { 'border-right': gridLine },
  bottomRight: { 'border-left': gridLine }
}

export class Cell11 extends Component {
  render() {
    return(
      <td className="r1c1" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell12 extends Component {
  render() {
    return(
      <td className="r1c2" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell13 extends Component {
  render() {
    return(
      <td className="r1c3" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell21 extends Component {
  render() {
    return(
      <td className="r2c1" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell22 extends Component {
  render() {
    return(
      <td className="r2c2" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell23 extends Component {
  render() {
    return(
      <td className="r2c3" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell31 extends Component {
  render() {
    return(
      <td className="r3c1" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell32 extends Component {
  render() {
    return(
      <td className="r3c2" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}

export class Cell33 extends Component {
  render() {
    return(
      <td className="r3c3" onClick={this.props.onClick} style={this.props.style}></td>
    );
  }
}