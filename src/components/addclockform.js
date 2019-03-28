import React, { Component } from 'react';
// TODO: limit moment to a single component?
import moment from 'moment';
import 'moment-timezone';

class AddClockForm extends Component {
  state = {
    timezones: [ {region:" ", names:[]}]
  }; 

    // constructor - get list and process
    //   output is [ {region: xxx, timezones:[]}, {region: xxx, timezones:[]}...]
    _getInfo(momentTz) {
      let s=momentTz.split('/');
      if (s.length < 2) 
        return false;
      return { region: s[0], name: s[1] }
    }
    componentDidMount() {
     // super(props); 
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
      console.log("after shift",tzlist)
      this.setState({timezones: tzlist});    
    }
  render() {
    console.log("state",this.state);
    return (
      <div className="AddClockForm">
          <p>Add Clock Form</p>
          <form>
            <select>
              {this.state.timezones.map ( (r,index) =>
                <optgroup key={index} label={r.region}>
                  {r.names.map ((n,index) =>
                    <option>{n}</option>
                  )}
                </optgroup>
              )}
            </select>
          </form>
      </div>
    );
  }
}


export default AddClockForm;