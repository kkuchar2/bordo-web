import React from "react";

import ErrorIcon from '@mui/icons-material/Error';
import { shakeAnimation} from "components/Forms/animation";
import {Text} from "kuchkr-react-component-library";

import {errorTextTheme, StyledFieldError} from "../FormErrors/style";

export interface FieldErrorProps {
    error: string
}

export const FieldError = (props: FieldErrorProps) => {

    const {error} = props;

    return <StyledFieldError {...shakeAnimation} {...props}>
        <ErrorIcon className={"icon"}/>
        <Text theme={errorTextTheme} text={error}/>
    </StyledFieldError>;
};