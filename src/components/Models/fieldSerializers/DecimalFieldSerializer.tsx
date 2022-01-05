import React, {useEffect, useState} from "react";

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

export const DecimalFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable} = props;

    const [currentValue, setCurrentValue] = useState(value ? value.toString() : "");

    useEffect(() => {
        onChange?.(currentValue.replace(",", "."));
    }, [currentValue, onChange]);

    if (!inEditMode || !isEditable) {
        return <Text theme={textTheme(inEditMode)} style={{width: '100%', overflow: 'auto'}} text={value}/>;
    }

    return <Input
        theme={inputTheme}
        placeholder={'e.g. 1.345 or 1,345'}
        value={currentValue}
        title={''}
        onChange={setCurrentValue}/>;
};

export default DecimalFieldSerializer;