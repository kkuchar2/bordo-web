import React, {useEffect, useState} from "react";
import Button from "components/Button";
import {useDispatch, useSelector} from "react-redux";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@material-ui/core";

import {dialogConfirmed, hideConfirmationDialog} from "../redux/reducers/application";

import "styles/components/Dialogs.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Dialogs() {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const dialogState = useSelector(state => state.dialog);

    const handleClose = () => dispatch(hideConfirmationDialog());

    useEffect(() => setOpen(dialogState.opened), [dialogState.opened]);

    const onConfirm = () => {
        dialogState.onConfirm();
        dispatch(dialogConfirmed());
    };

    return <div className={"dialogs"}>
        <Dialog
            className={"confirmDialog"}
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
            <DialogActions className={"dialogActions"}>
                <Button className="dialogButton deleteAccountButtonCancel" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="dialogButton deleteAccountButtonConfirm" onClick={onConfirm}
                        autoFocus>
                    Delete account
                </Button>
            </DialogActions>
        </Dialog>
    </div>;
}

export default Dialogs;