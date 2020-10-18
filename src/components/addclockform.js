import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment-timezone';

function AddClockForm({ handleAddClock }) {
  const [timezones, storeTimezones] = useState(null);
  const [selectedZone, setZone] = useState('Pacific');
  const [selectedRegion, setRegion] = useState('US');
  const [showForm, setShowForm] = useState(false);

  function buildTimezoneList() {
    const tz = moment.tz.names();
    const tzlist = {};
    let i = 0;

    // get timezone name list and process
    //   output is hash where each key is a region (ex. Africa) and value is array of timezones
    function getRegion(momentTz) {
      return momentTz.substr(0, momentTz.indexOf('/'));
    }
    function getName(momentTz) {
      return momentTz.substr(momentTz.indexOf('/') + 1);
    }

    while (i < tz.length) {
      const currentRegion = getRegion(tz[i]);
      if (!currentRegion) { ++i; } else { // eslint-disable-line no-plusplus
        const names = [];
        while ((getRegion(tz[i]) === currentRegion) && (i < tz.length)) {
          names.push(getName(tz[i]));
          ++i; // eslint-disable-line no-plusplus
        }
        tzlist[currentRegion] = names;
      }
    }

    return tzlist;
  }

  // setting up the timezone list (based on what moment.tz lib will support)
  useEffect(() => {
    storeTimezones(buildTimezoneList());
  }, []);

  // form event handlers
  const handleRegionChange = (event) => {
    const region = event.target.value;
    setRegion(region);
    setZone(timezones[region][0]);
  };

  const handleZoneChange = (event) => setZone(event.target.value);

  const toggleForm = () => setShowForm(!showForm);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddClock({ region: selectedRegion, zone: selectedZone });
    toggleForm();
  };

  // helper functions for rendering component
  const getForm = () => (
    <form onSubmit={handleSubmit}>
      <select id="region" onChange={handleRegionChange} defaultValue={selectedRegion} className="rounded">
        {Object.keys(timezones).map((r) => <option key={r}>{r}</option>)}
      </select>
      <select id="zone" onChange={handleZoneChange} defaultValue={selectedZone} className="rounded">
        {timezones[selectedRegion].map((opt) => <option key={`${opt}`}>{opt}</option>)}
      </select>
      <input type="submit" value="Add Clock" />
    </form>
  );

  const getButton = () => <button type="button" onClick={toggleForm}>Add Clock</button>;

  return (
    <div className="AddClockForm">
      { showForm ? getForm() : getButton()}
    </div>
  );
}

AddClockForm.propTypes = {
  handleAddClock: PropTypes.func.isRequired,
};

export default AddClockForm;
