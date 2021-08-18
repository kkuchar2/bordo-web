import {BASE_URL_DEV} from "appRedux/util.js";
import {StyledProfilePicture} from "components/EditableProfilePictureProperty/style.js";
import React from "react";

export const FileFieldSerializer = (props) => {

    const {name, value, inEditMode, onChange} = props;

    return  <StyledProfilePicture url={BASE_URL_DEV + value} size={"60px"}/>;
};

export default FileFieldSerializer;