import React, { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment-timezone';

import DigitalClock from './digitalClock';

function Clock({ timezone, id, deleteCallback }) {
  // why 2 state variables related to time?   time is a moment object and knows
  // about incrementing time, timezones, etc.   But when time.add() is called,
  // the object reference doesn't change.
  // Strategy was to keep moment.js to minimal components and so Digital Clock
  // doesn't know about moment - it just knows about time/date fields.  So
  // those are kept separately to force re-rendering.
  // Alternative approaches: (1) DigitalClock gets moment object.  (2) use react forceUpdate
  const [time, setTime] = useState(moment.tz(moment(), timezone));
  const [timeFields, updateTimeFields] = useState(_getFields(time));

  function _getFields(t) { // return hash of formatted time fields for a moment
    return {
      year: t.year(),
      month: t.month() + 1,
      day: t.date(),
      hour: t.hour(),
      minute: t.minute(),
      timezone: t.tz(),
    };
  }

  // useEffect hook: the [] arg is used so useEffect will only be called at
  // component mount/unmount times.
  useEffect(() => {
    const timer = window.setInterval(() => {
      time.add(1, 'minute');
      updateTimeFields(_getFields(time));
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="clock-container">
      <button className="btn" onClick={() => deleteCallback(id)}><i className="fa fa-close" /></button>
      <DigitalClock timeFields={timeFields} />
    </div>
  );
}

Clock.defaultProps = {
  timezone: moment.tz.guess(),
};

export default Clock;
