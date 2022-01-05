import React from "react";

import {Input, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {FieldSerializerProps} from "./fieldSerializer.types";

const textTheme = {
    textColor: "#b6b6b6",
    fontSize: "1em",
    textAlign: "left",
    fontWeight: 600
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

export const CharFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable} = props;

    const {t} = useTranslation();

    if (inEditMode && isEditable) {
        return <Input theme={inputTheme} value={value}
                      placeholder={`${t("TYPE_IN")} ${name}`} title={''} onChange={onChange}/>;
    }
    return <Text theme={textTheme} style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default CharFieldSerializer;