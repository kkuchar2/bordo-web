import React from "react";

import Text from "components/Text";

import "componentStyles/Button.scss";

function Button(props) {

    const onClick = () => {
        if (props.disabled) {
            return;
        }

        if (props.onClick) {
            props.onClick();
        }
    };

    const getAdditionalClassName = () => props.disabled ? "disabled" : "enabled";

    return (
        <button
            className={["button", props.className, getAdditionalClassName()].join(" ")}
            type={"submit"}
            onClick={onClick}
            aria-label={"submit-button"}>
            <div className={"content"}>
                <Text text={props.text}/>
                {props.children}
            </div>
        </button>
    );
}

export default Button;