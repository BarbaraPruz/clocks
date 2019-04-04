import React, { useState } from 'react';

import './App.css';

import Clock from './components/clock';
import AddClockForm from './components/addclockform';

function App () {
  // a clock with null name/timezone will result in Clock for local timezone 
  const [clocks, pushClock] = useState([null]);

  const addClock = (clockParams) => {
    pushClock([
      ...clocks,
      `${clockParams.region}/${clockParams.zone}`
    ]);    
  };

  return (      // render
    <div className="App">
      <h1>World Clocks</h1>
      <AddClockForm callback={addClock} />
      <div className="Clocks">
        { clocks.map((c,id) => 
          <Clock {...(c ? {timezone: c} : undefined)} key={id} /> 
        ) }
      </div>
    </div>
  );
}

export default App;
