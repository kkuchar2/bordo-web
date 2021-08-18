import {Text} from "kuchkr-react-component-library";
import React from "react";

export const DefaultFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange} = props;

    return <Text style={{width: '100%', overflow: 'auto'}} text={value} />;
};

export default DefaultFieldSerializer;