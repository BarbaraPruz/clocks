import React, { Component } from 'react';
// TODO: limit moment to a single component?
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

  _getInfo(momentTz) {
    let s=momentTz.split('/');
    if (s.length < 2) 
      return false;
    return { region: s[0], name: s[1] }
  }

  componentDidMount() {
    // get timezone name list and process
    //   output is [ {region: xxx, timezones:[]}, {region: xxx, timezones:[]}...] 
    // TODO: streamline this code!  
    let tz = moment.tz.names();
    let tzlist=[ { region: '', names:[] }];
    let i = 0; 
    let j = 0;
    while (i<tz.length) {
      let timezone = this._getInfo(tz[i]);
      if (timezone) {
        if (timezone.region === tzlist[j].region)
          tzlist[j].names.push(timezone.name)
        else {
          ++j;
          tzlist[j] = { region: timezone.region, names:[timezone.name]}
        }
      }
      ++i;
    }
    tzlist.shift();
    this.setState({timezones: tzlist});    
  }

  handleChange(event){
    let region = event.target.options[event.target.selectedIndex].parentNode.label;
    this.setState({selectedZone: event.target.value, selectedRegion: region});
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: only call cb if zone + region really selected
    this.props.callback({region: this.state.selectedRegion, zone: this.state.selectedZone});
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