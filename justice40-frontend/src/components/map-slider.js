import React, {useState} from 'react';

function MapSlider(props){
    const [value, setValue] = useState(0);
    return (
        <div className="slider-container">
            <label 
                className="usa-label" 
                htmlFor="usa-range">
                    {props.rangeName}
            </label>
            <input 
                id="usa-range" 
                className="usa-range" 
                onChange={e => setValue(e.target.value)}
                type="range" 
                min="0" 
                max="100" 
                step="20" 
                value="60" 
            />
        </div>
    );
};

export default MapSlider;