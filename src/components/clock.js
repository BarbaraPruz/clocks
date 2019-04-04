import React, { Component } from 'react';

import moment from 'moment';
import 'moment-timezone';

import DigitalClock from './digitalClock';

class Clock extends Component {

  constructor(props) {
    super(props)
    console.log("Clock Constructor",this.props.timezone);

    let temp = moment.tz(moment(), this.props.timezone);   
    this.state = {
      time: temp,
      timeFields: this._getFields(temp), 
      timeHandle: 0
    }

    this.incrementClock = this.incrementClock.bind(this);    
  }

  _getFields(t) {   // return hash of formatted time fields for a moment
    return { year: t.year(), month: t.month(), day: t.day(),
             hour: t.hour(), minute: t.minute(), timezone: t.tz()} 
  }

  componentDidMount() {
    let timer = setInterval ( this.incrementClock, 60000);
    this.setState( {timerHandle: timer}); 
  }  

  incrementClock() {
    this.state.time.add(1,'minute'); 
    this.setState( { timeFields: this._getFields(this.state.time) });  
  }

  componentWillUnmount(){
     clearInterval(this.state.timerHandle)
  }


  render() {
    return (
      <DigitalClock info={this.state.timeFields} />
    );
  }
}

export default Clock;