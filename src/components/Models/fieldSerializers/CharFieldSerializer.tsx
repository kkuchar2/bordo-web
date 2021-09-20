import React from "react";

import {Input, Text} from "kuchkr-react-component-library";

import {FieldSerializerProps} from "./fieldSerializer.types";

const textTheme = {
    textColor: "#323232",
    fontSize: "1em",
    textAlign: "left"
};

const inputTheme = {
    backgroundColor: "rgba(255,255,255,0)",
    textColor: "#474747",
    border: "2px solid " + "#e3e3e3",
    borderFocus: "2px solid " + "#aea7da",
    borderRadius: "0",
    height: "30px",
    width: "280px",
    padding: "0px",
    caretColor: "#646464",

    titleTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '1.1em',
        fontWeight: '500',
        textAlign: 'left',
        margin: "0px 0px 10px 0px"
    },

    inputTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '1.0em',
        fontWeight: 'bold',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    placeholderTextTheme: {
        textColor: '#ababab',
        fontSize: '1.1em',
        textAlign: 'left'
    }
};

export interface CharFieldSerializerProps extends FieldSerializerProps {
    inputCustomTheme: object
}

export const CharFieldSerializer = (props: CharFieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable, inputCustomTheme} = props;

    if (inEditMode && isEditable) {
        return <Input theme={inputCustomTheme ? inputCustomTheme : inputTheme}  initialValue={value}
                      placeholder={'Enter new ' + name} title={''} onChange={onChange}/>;
    }
    return <Text theme={textTheme} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default CharFieldSerializer;