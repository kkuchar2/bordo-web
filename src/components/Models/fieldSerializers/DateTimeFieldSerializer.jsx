import {Text} from "kuchkr-react-component-library";
import React from "react";

export const DateTimeFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange} = props;

    if (inEditMode) {
        return <Text text={value}/>;
    }
    return <Text text={value}/>;
};

export default DateTimeFieldSerializer;