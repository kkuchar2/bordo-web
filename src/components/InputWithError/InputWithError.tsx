import React from "react";

import {OutlinedInputProps, TextField, TextFieldProps} from "@mui/material";
import {styled} from "@mui/styles";
import {FieldErrors} from "components/Errors/FieldErrors/FieldErrors";

import {InputWithErrorProps} from "./InputWithError.types";
import {InputLabelStyle} from "./style";

const ThemedTextField = styled((props: TextFieldProps) => (
    <TextField InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}{...props}/>))

(({ theme }) => ({
    '& .MuiFilledInput-root': {
        width: "100%",
        border: 'none',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#252525',
        fontFamily: 'inherit',
        color: "#717171",
        fontWeight: 600,
        fontSize: '0.9em',
        '&:hover': {
            backgroundColor: '#202020',
        },
        '&.Mui-focused': {
            backgroundColor: '#252525',
        }
    },
    input: {
        "&:-webkit-autofill": {
            transition: "background-color 600000s 0s, color 600000s 0s",
            WebkitBoxShadow: `0 0 0 50px ${"#1A1A1A"} inset`,
            WebkitTextFillColor: "#b1b1b1",
            fontWeight: 600,
            fontSize: '0.9em'
        },
    }
}));

export const InputWithError = (props: InputWithErrorProps) => {

    const { id, errors, placeholder, onChange, type, autoComplete, defaultValue, disabled } = props;

    return <>
        <ThemedTextField
            label={placeholder}
            defaultValue={defaultValue}
            id={id}
            disabled={disabled}
            type={type}
            onChange={onChange}
            variant="filled"
            style={{ marginTop: 11 }}
            spellCheck={false}
            autoComplete={autoComplete}
            fullWidth
            InputLabelProps={{
                disableAnimation: true,
                style: InputLabelStyle
            }}/>
        <FieldErrors responseErrors={errors} fieldId={id}/>
    </>;
};