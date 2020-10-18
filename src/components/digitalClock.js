import React from 'react';
import PropTypes from 'prop-types';

const DigitalClock = ({ timeFields }) => (
  <div className="clock digital-clock">
    <div className="time">
      {timeFields.hour}
      :
      {(`0${timeFields.minute}`).slice(-2)}
    </div>
    <div className="date">
      {timeFields.month}
      /
      {timeFields.day}
      /
      {timeFields.year}
    </div>
    <div className="timezone">
      {timeFields.timezone}
    </div>
  </div>
);

DigitalClock.propTypes = {
  timeFields: PropTypes.shape({
    hour: PropTypes.number,
    minute: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    year: PropTypes.number,
    timezone: PropTypes.string,
  }).isRequired,
};
export default DigitalClock;
