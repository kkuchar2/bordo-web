import {Input, Text} from "kuchkr-react-component-library";
import React from "react";

const textTheme = {
    textColor: "#323232",
    fontSize: "1.0em",
    textAlign: "left"
}

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

export const IntegerFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange, isEditable, inputCustomTheme} = props;

    console.log("integerField: " + value)

    const onFieldChange = v => {
        console.log('On field change for serialzier name: '+ name)
        onChange(v);
    }

    if (inEditMode && isEditable) {
        return <Input theme={inputCustomTheme ? inputCustomTheme : inputTheme} initialValue={value ? value.toString() : ""} placeholder={'Enter value'} title={null} onChange={onFieldChange}/>;
    }
    return <Text theme={textTheme} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default IntegerFieldSerializer;