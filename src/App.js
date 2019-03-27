import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';
import './App.css';

import Clock from './components/clock';
import AddClockForm from './components/addclockform';

class App extends Component {
  state = { clocks: [{ timezone: moment.tz.guess(), time: moment.tz(moment(), moment.tz.guess()) }] }; 
  render() {
    // let h= moment.tz(moment(), 'Pacific/Honolulu').format('DD/MM/YYYY HH:MM')
    // let n= moment.tz(moment(), 'America/New_York').format('DD/MM/YYYY HH:MM')  
    // let s= moment.tz(moment(), 'Australia/Sydney').format('DD/MM/YYYY HH:MM')          
    // console.log("hnl",h,'ny',n,'s',s);
    // console.log('guess',moment.tz.guess())
    return (
      <div className="App">
          <h1>World Clocks</h1>
          <AddClockForm />
        <div className="Clocks">
          { this.state.clocks.map((c,id) => <Clock timezone={c.timezone} time={c.time.format('DD/MM/YYYY hh:mm')} key={id} /> ) }
        </div>
      </div>
    );
  }
}

export default App;
