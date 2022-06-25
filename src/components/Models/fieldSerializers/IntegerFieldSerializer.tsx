import React from "react";

import {FieldSerializerProps} from "components/Models/fieldSerializers/fieldSerializer.types";
import {Input, Text} from "kuchkr-react-component-library";

const textTheme = (inEditMode: boolean) => {
    return {
        textColor: inEditMode ? "#323232" : "#cccccc",
        fontSize: "1.0em",
        fontWeight: 500,
        textAlign: "left"
    };
};

const inputTheme = {
    backgroundColor: "#1a1a1a",
    textColor: "#474747",
    border: "none",
    borderRadius: "4px",
    height: "40px",
    width: "100%",
    padding: "10px",
    caretColor: "#646464",

    titleTextTheme: {
        textColor: '#F1F1F1',
        fontSize: '0.9em',
        fontWeight: 600,
        textAlign: 'left',
        margin: "20px 0px 10px 0px"
    },

    inputTextTheme: {
        textColor: '#e0e0e0',
        fontSize: '0.9em',
        fontWeight: 600,
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    placeholderTextTheme: {
        textColor: '#727272',
        fontSize: '1.1em',
        textAlign: 'left',
        fontWeight: 600
    }
};

export interface IntegerFieldSerializerProps extends FieldSerializerProps {
    inputCustomTheme: object
}

export const IntegerFieldSerializer = (props: IntegerFieldSerializerProps) => {

    const { value, inEditMode, onChange, isEditable, inputCustomTheme } = props;

    if (inEditMode && isEditable) {
        return <Input theme={inputCustomTheme ? inputCustomTheme : inputTheme}
                      value={value ? value.toString() : ""} placeholder={'Enter value'} title={''}
                      onChange={onChange}/>;
    }
    return <Text theme={textTheme(inEditMode)} style={{ width: '100%', overflow: 'auto' }} text={value}/>;
};

export default IntegerFieldSerializer;