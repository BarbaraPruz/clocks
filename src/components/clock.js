import React, { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment-timezone';

import DigitalClock from './digitalClock';

function Clock ({timezone}) {

  // to keep the same moment time object and interval timer between renders,
  // these values are saved in the state
  const [time, setTime] = useState(moment.tz(moment(), timezone));
  const [timerHandle, setTimerHandle] = useState(0);
  const [timeFields, updateTimeFields] = useState(_getFields(time));

  function _getFields(t) {   // return hash of formatted time fields for a moment
    return { year: t.year(), month: t.month(), day: t.day(),
             hour: t.hour(), minute: t.minute(), timezone: t.tz()} 
  }

  // useEffect hook: the [] arg is used so useEffect will only be called at
  // component mount/unmount times.
  useEffect(() => {
    console.log("setting timer",timerHandle);
      setTimerHandle(setInterval ( ()=>{
        time.add(1,'minute'); 
        updateTimeFields(_getFields(time));  
      }, 60000));
      return () => {
        console.log("Clock ",time.tz(),"unmounting");
        clearInterval(timerHandle);      
    }}, [])

  return (
      <DigitalClock timeFields={timeFields} />
  );
}  

Clock.defaultProps = {
  timezone: moment.tz.guess()   
};

export default Clock; 
