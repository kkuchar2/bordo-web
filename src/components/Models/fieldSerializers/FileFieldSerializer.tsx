import React from "react";

import {API_URL} from "appRedux/store";
import {StyledProfilePicture} from "components/EditableProfilePictureProperty/style";

import {FieldSerializerProps} from "./fieldSerializer.types";

export const FileFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange} = props;

    return <StyledProfilePicture url={API_URL + value} size={60}/>;
};

export default FileFieldSerializer;