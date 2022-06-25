import React from "react";

import Avatar from "react-avatar";

import {FieldSerializerProps} from "./fieldSerializer.types";

export const FileFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange} = props;

    return <Avatar
        src={value}
        style={{
            objectFit: "cover",
        }}
        size={"90px"}
        round={true}/>;
};

export default FileFieldSerializer;