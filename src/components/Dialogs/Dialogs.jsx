import ConfirmationDialog from "components/Dialogs/ConfirmationDialog/ConfirmationDialog.jsx";
import {StyledDialogs} from "components/Dialogs/style.js";
import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {selectorDialogs} from "appRedux/reducers/application";

const Dialogs = (props) => {

    const {opened, title, description, onConfirm, onCancel} = useSelector(selectorDialogs);

    const renderDialog = useCallback(() => {
        if (opened)
        {
            return <ConfirmationDialog title={title} description={description} onConfirm={onConfirm} onCancel={onCancel}/>;
        }
    }, [opened]);

    if (!opened) {
        return <></>;
    }

    return <StyledDialogs>
        {renderDialog()}
    </StyledDialogs>;
};

export default Dialogs;