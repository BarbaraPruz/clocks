import React, { Component } from 'react';

class DigitalClock extends Component {
  render() {
      console.log("Digital Clock Render",this.props.info);
      // TODO: add leading 0 to minute format when needed
    return (
      <div className="clock digital-clock">
          <p className="time">{this.props.info.hour}:{this.props.info.minute}</p>
          <p className="date">{this.props.info.month}/{this.props.info.day}/{this.props.info.year}</p>          
          <p className="timezone">{this.props.info.timezone}</p>          
      </div>
    );
  }
}

export default DigitalClock;