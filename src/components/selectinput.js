import React from 'react';

const SelectInput =  ({opts, cb}) => 
    <select id="zone" onChange={cb} className="rounded">
        {opts.map ( (opt,index) =>
            <option key={index}>{opt}</option>
        )}
    </select>
;

export default SelectInput;
