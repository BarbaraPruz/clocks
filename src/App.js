import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';
import './App.css';

import Clock from './components/clock';
import AddClockForm from './components/addclockform';

class App extends Component {
  state = {
            count : 0,
            clocks: [{ timezone: moment.tz.guess(), time: moment.tz(moment(), moment.tz.guess()) }],
            timerHandle: 0 
          }; 

  constructor(props) {
    super(props);
    this.incrementClocks = this.incrementClocks.bind(this);
  }

  incrementClocks() {
    this.state.clocks.forEach( (clock) => {
      clock.time.add(1,'minute'); 
    });
    this.setState({count: this.state.count+1})  // trigger the clock re-rendering  
  }

  componentDidMount() {
    let timer = setInterval ( this.incrementClocks, 60000);
    this.setState( {timerHandle: timer}); 
  }

  componentWillUnmount(){
    clearInterval(this.state.timerHandle)
  }
  render() {
    return (
      <div className="App">
          <h1>World Clocks</h1>
          <AddClockForm />
        <div className="Clocks">
          { this.state.clocks.map((c,id) => <Clock timezone={c.timezone} time={c.time} count={this.state.count} key={id} /> ) }
        </div>
      </div>
    );
  }
}

export default App;
