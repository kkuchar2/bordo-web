import React from "react";

import {FieldSerializerProps} from "components/Models/fieldSerializers/fieldSerializer.types";
import {Input, Text} from "kuchkr-react-component-library";

const textTheme = (inEditMode: boolean) => {
    return {
        textColor: inEditMode ? "#323232" : "#7c7c7c",
        fontSize: "1.0em",
        fontWeight: 500,
        textAlign: "left"
    };
};

const inputTheme = {
    backgroundColor: "rgba(255,255,255,0)",
    textColor: "#474747",
    border: "2px solid " + "#e3e3e3",
    borderFocus: "2px solid " + "#aea7da",
    borderRadius: "0",
    height: "30px",
    width: "100%",
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

export interface IntegerFieldSerializerProps extends FieldSerializerProps {
    inputCustomTheme: object
}

export const IntegerFieldSerializer = (props: IntegerFieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable, inputCustomTheme} = props;

    if (inEditMode && isEditable) {
        return <Input theme={inputCustomTheme ? inputCustomTheme : inputTheme}
                      initialValue={value ? value.toString() : ""} placeholder={'Enter value'} title={''}
                      onChange={onChange}/>;
    }
    return <Text theme={textTheme(inEditMode)} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default IntegerFieldSerializer;