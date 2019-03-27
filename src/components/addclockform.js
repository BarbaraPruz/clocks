import React, { Component } from 'react';

class AddClockForm extends Component {
    // constructor - get list and process
    //   output is [ {region: xxx, timezones:[]}, {region: xxx, timezones:[]}...]
  render() {
    return (
      <div className="AddClockForm">
          <p>Add Clock Form</p>
      </div>
    );
  }
}
/*
<select>
    <optgroup label="CITY 1">
        <option>City 1 branch A</option>
        <option>City 1 branch B</option>
        <option>City 1 branch C</option>
    </optgroup>

    <optgroup label="CITY 2">
        <option>City 2 branch A</option>
        <option>City 2 branch B</option>
    </optgroup>
</select>
*/
export default AddClockForm;