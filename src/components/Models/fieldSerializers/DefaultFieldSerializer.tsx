import React from "react";

import {Text} from "kuchkr-react-component-library";

import {FieldSerializerProps} from "./fieldSerializer.types";

export const DefaultFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange} = props;

    return <Text style={{width: '100%', overflow: 'auto'}} text={value}/>;
};

export default DefaultFieldSerializer;