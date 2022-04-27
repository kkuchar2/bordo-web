import {TextFieldProps} from "@mui/material";

type ErrorProps = {
    errors: any;
}

export type InputWithErrorProps = ErrorProps & TextFieldProps;