import React, {useCallback} from "react";

import Text from "components/Text.jsx";
import Input from "components/Input.jsx";
import Slider from "rc-slider";

import {logPosition} from "util/util.js";

import 'rc-slider/assets/index.css';

import "componentStyles/SliderWithInput.scss";

function SliderWithInput(props) {

    const setValue = useCallback((v) => {
        if (props.logharitmic) {
            return logPosition(v, props.min, props.max)
        }
        else {
            return props.value * (100 / 50);
        }
    }, [props.value, props.logharitmic, props.min, props.max])

    return <div className={"sliderWithInput"}>
        <div className={"title"}>
            <Text className={"title"} text={props.text}/>
        </div>
        <Text className={"description"} text={props.description} />

        <div className={"sliderAndInput"}>

            <Slider
                handleStyle={{
                    borderColor: 'transparent',
                    height: 20,
                    width: 20,
                    marginTop: -5,
                    backgroundColor: '#00aeff',
                }}
                dotStyle={{
                    borderColor: 'transparent',
                    backgroundColor: '#c4c4c4',
                    marginBottom: -3,
                }}
                railStyle={{backgroundColor: '#404040', height: 10}}
                className={"slider"}
                marks={props.marks}
                included={false}
                value={setValue(props.value)}
                onChange={props.onSliderChange}
                defaultValue={1}/>

            <div className={"valueInput"}>
                <Input
                    id="fname"
                    name="fname"
                    disabled={false}
                    value={Math.ceil(props.value)}
                    active={true}
                    onChange={props.onInputChange}/>
            </div>
        </div>
    </div>;
}

export default SliderWithInput;