import React from "react";

import {StyledWaitingComponent} from "components/WaitingComponent/style";
import {Spinner} from "kuchkr-react-component-library";

export interface WaitingComponentProps {
    text?: string
}

const WaitingComponent = (props: WaitingComponentProps) => {

    const {text} = props;

    return <StyledWaitingComponent>
        <Spinner text={text} theme={Spinner.darkTheme}/>
    </StyledWaitingComponent>;
};

export default WaitingComponent;