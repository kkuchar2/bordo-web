import {Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const textTheme = {
    textColor: "#323232",
    fontSize: "1em",
    textAlign: "left"
};

export const DateFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange, isEditable} = props;

    const [selectedDay, setSelectedDay] = useState(value ? new Date(value) : new Date());

    const onDateChange = useCallback((date) => {
        onChange(date.toISOString().split('T')[0]);
        setSelectedDay(date);
    }, []);


    if (inEditMode && isEditable) {
        return <DatePicker selected={selectedDay} onChange={onDateChange} portalId="root-portal"/>;
    }
    return <Text theme={textTheme} text={value}/>;
};

export default DateFieldSerializer;