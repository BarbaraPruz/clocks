import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import "moment-timezone";

import DigitalClock from "./digitalClock";

function Clock({ timezone, id, deleteCallback }) {
  function now() {
    return moment.tz(moment(), timezone);
  }

  const getFields = (
    t // return hash of formatted time fields for a moment
  ) => ({
    year: t.year(),
    month: t.month() + 1,
    day: t.date(),
    hour: t.hour(),
    minute: t.minute(),
    timezone: t.tz(),
  });

  const [timeFields, updateTimeFields] = useState(getFields(now()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      updateTimeFields({ ...getFields(moment.tz(moment(), timezone)) });
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [timezone]);

  return (
    <div className="clock-container">
      <button
        aria-label="close clock"
        type="button"
        className="clock-btn"
        onClick={() => deleteCallback(id)}
      >
        <i className="fa fa-close" />
      </button>
      <DigitalClock timeFields={timeFields} />
    </div>
  );
}

Clock.defaultProps = {
  timezone: moment.tz.guess(),
};

Clock.propTypes = {
  timezone: PropTypes.string,
  id: PropTypes.string.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};

export default Clock;
