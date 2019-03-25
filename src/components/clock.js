import React, { Component } from 'react';

class Clock extends Component {
  render() {
      console.log("Clock for",this.props.timezone);
    return (
      <div className="Clock">
          <p>Clock for {this.props.timezone} timezone</p>
      </div>
    );
  }
}

export default Clock;