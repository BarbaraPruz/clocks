import React, { Component } from 'react';

import './App.css';

import Clock from './components/clock';
import AddClockForm from './components/addclockform';

class App extends Component {
  // a clock with null name/timezone will result in Clock for local timezone
  state = {
    clocks: [ null],
  }; 

  constructor(props) {
    super(props);
    this.addClock = this.addClock.bind(this);    
  }

  addClock(clockParams) {
    let tz = `${clockParams.region}/${clockParams.zone}` 
    console.log("Adding clock for",tz);
    this.setState(prevState => ({
      clocks: [...prevState.clocks, tz]
    }))
  }


  render() {
    return (
      <div className="App">
        <h1>World Clocks</h1>
        <AddClockForm callback={this.addClock} />
        <div className="Clocks">
          { this.state.clocks.map((c,id) => 
            <Clock {...(c ? {timezone: c} : undefined)} key={id} /> 
          ) }
        </div>
      </div>
    );
  }
}

export default App;
