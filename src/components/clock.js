import React, { Component } from 'react';

class Clock extends Component {
  render() {
      console.log("Clock for",this.props.timezone);
    return (
      <div className="Clock">
          <p>{this.props.timezone} {this.props.time}</p>
      </div>
    );
  }
}

export default Clock;