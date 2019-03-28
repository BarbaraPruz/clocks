import React, { Component } from 'react';

class Clock extends Component {
  render() {
      console.log("Clock for",this.props.timezone);
    return (
      <div className="clock digital-clock">
          <p>{this.props.time}</p>
          <p class="timezone">{this.props.timezone}</p>          
      </div>
    );
  }
}

export default Clock;