import React, {useCallback} from "react";

import {booleanSelectTheme} from "components/Models/TableRow/style";
import {Select, Text} from "kuchkr-react-component-library";

import {FieldSerializerProps} from "./fieldSerializer.types";

const textTheme = {
    textColor: "#6E6893",
    fontSize: "1.0em",
    fontWeight: 700,
    textAlign: "left",
    margin: "0px 0px 0px 0px"
};

export const BooleanFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange, isEditable} = props;

    const onSelectChange = useCallback((v) => {
        onChange?.(v.value);
    }, []);

    const toUpperFirst = useCallback((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }, []);

    if (inEditMode && isEditable) {
        return <Select
            theme={booleanSelectTheme}
            maxMenuHeight={100}
            defaultValue={{value: value, label: toUpperFirst(value.toString())}}
            options={[
                {value: true, label: "True"},
                {value: false, label: "False"}
            ]}
            onChange={onSelectChange}
        />;
    }
    return <Text theme={textTheme} style={{width: '100%'}} text={value ? 'True' : 'False'}/>;
};

export default BooleanFieldSerializer;