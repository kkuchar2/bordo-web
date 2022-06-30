import React from "react";

import {FieldSerializerProps} from "components/Models/fieldSerializers/fieldSerializer.types";
import {Text} from "kuchkr-react-component-library";

const textTheme = {
    textColor: "#d0d0d0",
    fontSize: "1.0em",
    textAlign: "left"
};

export const OneToOneFieldSerializer = (props: FieldSerializerProps) => {

    const { value } = props;

    return <Text theme={textTheme} style={{ width: '100%', overflow: 'auto' }} text={value}/>;
};

export default OneToOneFieldSerializer;