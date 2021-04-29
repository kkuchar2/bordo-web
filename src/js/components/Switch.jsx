import React, {useEffect, useState} from 'react';
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "componentStyles/Switch.scss";

function Switch(props) {

    const [value, setValue] = useState(false);

    useEffect(() => setValue(props.value), [props.value]);

    const onToggle = () => {
        setValue(!value);
        props.onValueChange(!value);
    };

    return <div className={[props.className, "switch"].join(' ')}>
        <FontAwesomeIcon className={"sun"} icon={faSun}/>
        <input
            className="react-switch-checkbox"
            id={`react-switch-new`}
            type="checkbox"
            checked={value}
            onChange={onToggle}
        />
        <label
            className="react-switch-label"
            htmlFor={`react-switch-new`}
            style={{background: value ? '#00c343' : '#4890d7'}}>
            <span className={`react-switch-button`}/>
        </label>
        <FontAwesomeIcon className={"moon"} icon={faMoon}/>
    </div>;
}

export default Switch;