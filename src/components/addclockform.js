import React, { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment-timezone';

import SelectInput from './selectinput';
// ToDo: break this up into more maintainable pieces.
function AddClockForm(props) {

  const [timezones, storeTimezones] = useState(null);
  const [selectedZone, setZone] = useState('GMT');
  const [selectedRegion, setRegion] = useState('Etc');
  const [showForm, setShowForm] = useState(false);

  // setting up the timezone list (based on what moment.tz lib will support)
  // This is done at "componentDidMount" time by using useEffect hook with [] param
  useEffect(() => {
    storeTimezones(buildTimezoneList());  
  }, [])

  function buildTimezoneList() {
    let tz = moment.tz.names();
    let tzlist={};
    let i = 0;

    // get timezone name list and process
    //   output is hash where each key is a region (ex. Africa) and value is array of timezones
    function getRegion(momentTz) {
      return momentTz.substr(0, momentTz.indexOf('/'))
    } 
    function getName(momentTz) {
      return momentTz.substr(momentTz.indexOf('/')+1)
    }

    while (i < tz.length) {
      let currentRegion = getRegion(tz[i]);
      if (!currentRegion) 
        ++i;
      else {
        let names=[]
        while ( (getRegion(tz[i]) === currentRegion) &&  (i<tz.length)) {
          names.push(getName(tz[i]))
          ++i;
        }
        tzlist[currentRegion] = names;
      }
    }

    return tzlist;
  }

  // form event handlers
  const handleRegionChange = (event) => {
    let region = event.target.value;
    setRegion(region);
    setZone(timezones[region][0]);
  }

  const handleZoneChange = (event) => setZone(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.callback({region: selectedRegion, zone: selectedZone});
    toggleForm();
  }

  const toggleForm = () => setShowForm(!showForm);

  // helper functions for rendering component
  function buildform() {
    if (!showForm ) return null;
    return (
      <form onSubmit={handleSubmit}>
        <select id="region" onChange={handleRegionChange} defaultValue={selectedRegion} className="rounded">
          { Object.keys(timezones).map( (r) =>
            <option key={r}>{r}</option>
          )}
        </select>
        <SelectInput cb={handleZoneChange} opts={timezones[selectedRegion]} />
        <input type="submit" value="Add Clock" />
      </form>
    )
  }

  function getButton() {
    if (showForm) return null; 
    return <button onClick={toggleForm}>Add Clock</button>
  }

  return (
    <div className="AddClockForm">
      { buildform() }
      { getButton() }
    </div>
  );
}

export default AddClockForm;