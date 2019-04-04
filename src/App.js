import React, { Component } from 'react';

import './App.css';

import Clock from './components/clock';
import AddClockForm from './components/addclockform';

class App extends Component {
  // ToDo: use local timezone for initial clock
  state = {
            clocks: [ 'Pacific/Honolulu'],
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
          { this.state.clocks.map((c,id) => <Clock timezone={c} key={id} /> ) }
        </div>
      </div>
    );
  }
}

export default App;
