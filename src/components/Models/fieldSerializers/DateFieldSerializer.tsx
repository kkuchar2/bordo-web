import React, {useCallback, useState} from "react";

import {Text} from "kuchkr-react-component-library";
import DatePicker from 'react-datepicker';

import {FieldSerializerProps} from "./fieldSerializer.types";
import "react-datepicker/dist/react-datepicker.css";

import "./ReactDatePicker.scss";

const textTheme = {
    textColor: "#323232",
    fontSize: "1em",
    textAlign: "left"
};

export const DateFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable} = props;

    const [selectedDay, setSelectedDay] = useState(value ? new Date(value) : new Date());

    const onDateChange = useCallback((date) => {
        onChange(date.toISOString().split('T')[0]);
        setSelectedDay(date);
    }, []);

    if (inEditMode && isEditable) {
        return <DatePicker wrapperClassName="datePicker" selected={selectedDay} onChange={onDateChange} portalId="root-portal"/>;
    }
    return <Text theme={textTheme} text={value}/>;
};

export default DateFieldSerializer;