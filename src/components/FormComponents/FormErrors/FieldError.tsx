import React from "react";

import ErrorIcon from '@material-ui/icons/Error';
import {Text} from "kuchkr-react-component-library";

import {errorTextTheme, StyledFieldError} from "./style";

export interface FieldErrorProps {
    error: string
}

export const FieldError = (props: FieldErrorProps) => {

    const {error} = props;

    return <StyledFieldError {...props}>
        <ErrorIcon className={"icon"}/>
        <Text theme={errorTextTheme} text={error}/>
    </StyledFieldError>;
};