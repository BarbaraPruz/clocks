import React, { Component } from 'react';

class Clock extends Component {
  render() {
      console.log("Clock Render",this.props.time.format("hh:mm"));
    return (
      <div className="clock digital-clock">
          <p className="time">{this.props.time.format("hh:mm")}</p>
          <p className="date">{this.props.time.format("MM/DD/YYYY")}</p>          
          <p className="timezone">{this.props.timezone}</p>          
      </div>
    );
  }
}

export default Clock;