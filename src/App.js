import React, { Component } from 'react';

import './App.css';

import Clock from './components/clock';

class App extends Component {
  state = { clocks: [{ timezone: 'local'}] }; 
  render() {
    return (
      <div className="App">
          <h1>World Clocks</h1>
        <div className="Clocks">
          { this.state.clocks.map((c,id) => <Clock timezone={c.timezone} key={id} /> ) }
        </div>
      </div>
    );
  }
}

export default App;
