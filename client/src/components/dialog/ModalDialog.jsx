import React, {Component} from "react";

import IconButton from "components/buttons/IconButton.jsx";
import Image from "components/image/image.jsx";

import "./ModalDialog.scss"

class ModalDialog extends Component {

    render() {
        return (
            <div className={"ModalDialog"}>
                <div className={"background"}/>
                <div className={"dialog"}>
                    <IconButton
                        className={"closeButton"}
                        onClick={this.props.onClose}
                        icon={process.env.PUBLIC_URL + '/close_icon.png'}
                        content={""}>
                    </IconButton>

                    <div className={"mailIcon"}>
                        <Image src={process.env.PUBLIC_URL + '/mail_icon2.png'} />
                    </div>
                    <div className={"dialog-content-text"}>
                        <div className={"confirm-title"}>E-mail confirmation</div>
                         <div className={"confirm-message"}>
                             We have sent email to sampleemail@.com to confirm the
                             validity of our email address. After receiving the email follow
                             the link provoded to complete your registration
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDialog;