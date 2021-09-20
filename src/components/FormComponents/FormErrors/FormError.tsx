import React from "react";

import ErrorIcon from '@material-ui/icons/Error';
import {Text} from "kuchkr-react-component-library";

import {errorTextTheme, StyledFormError} from "./style";

export interface FormErrorProps {
    error: string
}

export const FormError = (props: FormErrorProps) => {

    const {error} = props;

    return <StyledFormError {...props}>
        <ErrorIcon className={"icon"}/>
        <Text theme={errorTextTheme} text={error}/>
    </StyledFormError>;
};