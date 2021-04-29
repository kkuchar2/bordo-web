import React, {useCallback, useEffect, useState} from "react";
import Button from "components/Button";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@material-ui/core";
import {dialogConfirmed, hideDialog} from "redux/reducers/application";

import "styles/components/Dialogs.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Dialogs() {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const dialogState = useSelector(state => state.dialog);

    const handleClose = () => {
        dialogState.onCancel();
        dispatch(hideDialog());
    };

    useEffect(() => setOpen(dialogState.opened), [dialogState.opened]);

    const onConfirm = () => {
        dialogState.onConfirm();
        dispatch(dialogConfirmed());
    };

    const getDialogClassName = useCallback(() => {
        if (dialogState.type === 'error') {
            return 'errorDialog';
        }
        else {
            return 'confirmDialog';
        }
    }, [dialogState]);

    const renderDialogActions = useCallback(() => {
        if (dialogState.type === 'error') {
            return <DialogActions className={"dialogActions"}>
                <Button className={"buttonBlack dialogButton"} onClick={handleClose}>Close</Button>
            </DialogActions>;
        }
        else {
            return <DialogActions className={"dialogActions"}>
                <Button
                    className={classNames(dialogState.cancelButtonClass, 'dialogButton')}
                    onClick={handleClose}>
                    {dialogState.cancelButtonName}
                </Button>
                <Button
                    className={classNames(dialogState.confirmButtonClass, 'dialogButton')}
                    onClick={onConfirm}
                    autoFocus>
                    {dialogState.confirmButtonName}
                </Button>
            </DialogActions>;
        }
    }, [dialogState]);

    return <div className={"dialogs"}>
        <Dialog
            className={getDialogClassName()}
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="confirmation-dialog-slide-title"
            aria-describedby="confirmation-dialog-slide-description"
        >
            <DialogTitle className={"dialogTitle"}>{dialogState.title}</DialogTitle>
            <DialogContent className={"dialogContent"}>
                <DialogContentText className={"dialogContentText"}>
                    {dialogState.content}
                </DialogContentText>
            </DialogContent>
            {renderDialogActions()}
        </Dialog>
    </div>;
}

export default Dialogs;