import React, {useCallback} from "react";

import Text from "components/Text.jsx";
import Input from "components/Input.jsx";
import Slider from "rc-slider";
import classNames from "classnames";

import {logPosition} from "util/util.js";

import 'rc-slider/assets/index.css';

import "componentStyles/SliderWithInput.scss";

function SliderWithInput(props) {

    const {text, description, logharitmic, marks, value, min, max, disabled, onSliderChange, onInputChange} = props;

    const setValue = useCallback((v) => {
        if (logharitmic) {
            return logPosition(v, min, max)
        }
        else {
            return value * (100 / max);
        }
    }, [value, logharitmic, min, max])

    return <div className={classNames("sliderWithInput", { disabled: disabled })}>
        <div className={"title"}>
            <Text className={"title"} text={text}/>
        </div>
        <Text className={"description"} text={description}/>

        <div className={"sliderAndInput"}>

            <Slider
                handleStyle={{
                    borderColor: 'transparent',
                    height: 20,
                    width: 20,
                    marginTop: -5,
                    backgroundColor: !disabled ? '#00aeff' : '#4b4b4b',
                }}
                dotStyle={{
                    borderColor: 'transparent',
                    backgroundColor: !disabled ? '#c4c4c4' : '#4b4b4b',
                    marginBottom: -8,
                    height: 17,
                    borderRadius: 0,
                    marginLeft: 0,
                    border: "1px solid " + (!disabled ? '#c4c4c4' : '#4b4b4b'),
                    padding: 0,
                    width: 0,
                }}
                railStyle={{
                    borderRadius: 0,
                    backgroundColor: !disabled ? '#404040' : '#313131',
                    height: 11
                }}
                className={"slider"}
                marks={marks}
                included={false}
                disabled={disabled}
                value={setValue(value)}
                onChange={onSliderChange}
                defaultValue={value}/>

            <div className={"valueInput"}>
                <Input
                    id="fname"
                    name="fname"
                    disabled={disabled}
                    value={Math.ceil(value)}
                    active={true}
                    onChange={onInputChange}/>
            </div>
        </div>
    </div>;
}

export default SliderWithInput;