import {Input, Text} from "kuchkr-react-component-library";
import React from "react";

const textTheme = {
    textColor: "#323232",
    fontSize: "1em",
    textAlign: "left"
};

const inputTheme = {
    backgroundColor: "#ffffff",
    textColor: "#2f2f2f",
    placeholderTextColor: "#c5c5c5",
    border: "none",
    borderFocus: "none",
    borderRadius: "6px",
    height: "40px",
    width: "100%",
    padding: "10px",
    fontSize: '1em',

    textTheme: {
        textColor: '#545454',
        fontSize: '1em'
    }
};

export const CharFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange, isEditable, inputCustomTheme} = props;

    const onFieldChange = v => {
        onChange(v);
    };

    if (inEditMode && isEditable) {
        return <Input theme={inputCustomTheme ? inputCustomTheme : inputTheme} initialValue={value} placeholder={'Enter new ' + name} title={null} onChange={onFieldChange}/>;
    }
    return <Text theme={textTheme} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default CharFieldSerializer;