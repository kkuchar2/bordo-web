import {Text} from "kuchkr-react-component-library";
import React from "react";

const textTheme = {
    textColor: "#323232",
    fontSize: "1.0em",
    textAlign: "left"
}

export const AutoFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange} = props;

    return  <Text theme={textTheme} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default AutoFieldSerializer;