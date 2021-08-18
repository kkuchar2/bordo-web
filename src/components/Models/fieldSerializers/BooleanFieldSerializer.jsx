import {booleanSelectTheme} from "components/Models/TableRow/style.js";
import {Select, Text} from "kuchkr-react-component-library";
import React from "react";

const textTheme = {
    textColor: "#323232",
    fontSize: "1.0em",
    textAlign: "left"
}

export const BooleanFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange, isEditable} = props;

    if (inEditMode && isEditable) {
        return <Select
            theme={booleanSelectTheme}
            initialIndex={value ? 0 : 1}
            items={[true, false]}
            onChange={(idx, value) => {
                console.log('On field change for serialzier name: '+ name)
                onChange(value)
            }}
            dataItemRenderer={item => <div>{item ? 'True' : 'False'}</div>}
            itemValueProvider={item => <div>{item ? 'True' : 'False'}</div>}
        />;
    }
    return <Text theme={textTheme} style={{width: '100%'}} text={value ? 'True' : 'False'}/>;
};

export default BooleanFieldSerializer;