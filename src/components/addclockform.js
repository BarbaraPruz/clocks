import React, { Component } from 'react';

import moment from 'moment';
import 'moment-timezone';

class AddClockForm extends Component {
  state = {
    timezones: [ {region:" ", names:[]}],
    selectedZone: '',
    selectedRegion: ''
  }; 

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let tz = moment.tz.names();
    let tzlist=[];
    let i = 0;

    // get timezone name list and process
    //   output is [ {region: xxx, timezones:[]}, {region: xxx, timezones:[]}...] 
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
        tzlist.push({region: currentRegion, names:names})
      }
    }
    this.setState({timezones: tzlist});  
  }

  handleChange(event){
    let region = event.target.options[event.target.selectedIndex].parentNode.label;
    this.setState({selectedZone: event.target.value, selectedRegion: region});
  }

  handleSubmit(e) {
    e.preventDefault();
    if ((this.state.selectedRegion.length > 0) && (this.state.selectedZone.length > 0)) {
      this.props.callback({region: this.state.selectedRegion, zone: this.state.selectedZone});
    }
  }

  render() {
    return (
      <div className="AddClockForm">
          <p>Add Clock Form</p>
          <form onSubmit={this.handleSubmit}>
            <select id="optionList" onChange={this.handleChange}>
              {this.state.timezones.map ( (r,index) =>
                <optgroup key={index} label={r.region}>
                  {r.names.map ((n,index) =>
                    <option key={index}>{n}</option>
                  )}
                </optgroup>
              )}
            </select>
            <input type="submit" value="Add Clock" />
          </form>
      </div>
    );
  }
}

export default AddClockForm;