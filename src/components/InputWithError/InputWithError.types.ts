import { HTMLProps } from "react";

type ErrorProps = {
    errors: any[];
}

export type InputWithErrorProps = ErrorProps & HTMLProps<HTMLInputElement>