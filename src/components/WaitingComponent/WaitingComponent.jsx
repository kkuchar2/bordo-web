import {Spinner} from "kuchkr-react-component-library";
import React from "react";
import {StyledWaitingComponent} from "components/WaitingComponent/style.js";

const WaitingComponent = (props) => {

    const {text} = props;

    return <StyledWaitingComponent>
        <Spinner text={text} theme={Spinner.darkTheme}/>
    </StyledWaitingComponent>;
};

export default WaitingComponent;