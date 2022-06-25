import React, {useCallback} from "react";

import {booleanSelectTheme} from "components/Models/TableRow/style";
import {Select, Text} from "kuchkr-react-component-library";

import {FieldSerializerProps} from "./fieldSerializer.types";

const textTheme = {
    textColor: "#d0d0d0",
    fontSize: "1.0em",
    fontWeight: 600,
    textAlign: "left",
    margin: "0px 0px 0px 0px",
};

export const BooleanFieldSerializer = (props: FieldSerializerProps) => {

    const { value, inEditMode, onChange, isEditable } = props;

    const onSelectChange = useCallback((v) => {
        onChange?.(v.value);
    }, []);

    const toUpperFirst = useCallback((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }, []);

    if (inEditMode && isEditable) {
        return <Select
            theme={booleanSelectTheme}
            maxMenuHeight={105}
            menuPortalTarget={document.body}
            defaultValue={{ value: value, label: toUpperFirst(value.toString()) }}
            options={[
                { value: true, label: "True" },
                { value: false, label: "False" }
            ]}
            onChange={onSelectChange}
        />;
    }
    return <Text theme={textTheme} style={{ width: '100%' }} text={value ? 'True' : 'False'}/>;
};

export default BooleanFieldSerializer;