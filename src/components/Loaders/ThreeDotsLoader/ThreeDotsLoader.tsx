import React from "react";

import {StyledThreeDotsLoader, StyledThreeDotsLoaderInner, ThreeDotsLoaderProps} from "./style";

const ThreeDotsLoader = (props: ThreeDotsLoaderProps) => {

    const {color = "#ffa700", scale = 1, time = 0.75} = props;

    return <StyledThreeDotsLoader scale={scale}>
        <StyledThreeDotsLoaderInner color={color} time={time}/>
    </StyledThreeDotsLoader>;
};

export default ThreeDotsLoader;