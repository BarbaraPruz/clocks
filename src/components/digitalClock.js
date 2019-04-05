import React from 'react';

const DigitalClock =  ({timeFields}) => 
  <div className="clock digital-clock">
    <p className="time"> {timeFields.hour}:{('0'+timeFields.minute).slice(-2)} </p>
    <p className="date"> {timeFields.month}/{timeFields.day}/{timeFields.year} </p>          
    <p className="timezone"> {timeFields.timezone} </p>          
  </div>
;
 
export default DigitalClock;
