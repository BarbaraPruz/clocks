import React, { Component } from 'react';

import moment from 'moment';
import 'moment-timezone';

import SelectInput from './selectinput';

class AddClockForm extends Component {
  state = {
    timezones: null,
    selectedZone: '',
    selectedRegion: 'US'
  }; 

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleZoneChange = this.handleZoneChange.bind(this); 
  }

  componentDidMount() {
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
    this.setState({timezones: tzlist});  
  }

  handleRegionChange(event) {
    let region = event.target.value;
    this.setState({selectedRegion: region});
  }

  handleZoneChange(event){
    this.setState({selectedZone: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.selectedZone.length > 0) {
      this.props.callback({region: this.state.selectedRegion, zone: this.state.selectedZone});
    }
  }

  buildform() {
    if (this.state.timezones) {
      return (
        <form onSubmit={this.handleSubmit}>
          <select id="region" onChange={this.handleRegionChange} defaultValue={this.state.selectedRegion}>
            { Object.keys(this.state.timezones).map( (r) =>
              <option key={r}>{r}</option>
            )}
          </select>
          <SelectInput cb={this.handleZoneChange} opts={this.state.timezones[this.state.selectedRegion]} />
          <input type="submit" value="Add Clock" />
        </form>
      )
    }
    return null;
  }

  render() {
    return (
      <div className="AddClockForm">
          <p>Add Clock Form</p>
          { this.buildform()}
      </div>
    );
  }
}

export default AddClockForm;