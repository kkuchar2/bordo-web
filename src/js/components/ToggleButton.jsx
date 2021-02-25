import React, {useEffect, useState} from "react";

import Text from "components/Text";

import "componentStyles/ToggleButton.scss";

function ToggleButton(props) {

    const [toggled, setToggled] = useState(false);

    const onClick = () => {
        if (props.disabled) {
            return;
        }

        props.onToggle(!toggled);

        setToggled(!toggled);
    };

    useEffect(() => {
        props.onToggle(toggled);
    }, [toggled]);

    const getAdditionalClassName = () => toggled ? "toggled" : "";

    return (
        <button
            className={["toggleButton", props.className, getAdditionalClassName()].join(" ")}
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

export default ToggleButton;