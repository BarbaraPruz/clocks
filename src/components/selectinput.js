import React from 'react';

const SelectInput = ({ opts, cb }) => (
  <select id="zone" onChange={cb} className="rounded">
    {opts.map((opt) => <option key={`${opt}`}>{opt}</option>)}
  </select>
);

export default SelectInput;
