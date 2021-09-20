import React from "react";

import {Text} from "kuchkr-react-component-library";

import {FieldSerializerProps} from "./fieldSerializer.types";

export const DateTimeFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange} = props;

    if (inEditMode) {
        return <Text text={value}/>;
    }
    return <Text text={value}/>;
};

export default DateTimeFieldSerializer;