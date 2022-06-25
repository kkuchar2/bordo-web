import { ReactNode } from "react";

import {Errors} from "tools/client/client.types";

import {FormConfig} from "../../../api/formConfig";

export interface FormProps {
    config: FormConfig;
    initialValues?: object;
    title?: string;
    description?: string;
    className?: string;
    buttonsClasses?: string;
    customDescription?: ReactNode;
    onSubmit?: (formData: any) => void; // TODO: change to dynamic fields
    onCancel?: any
    disabled: boolean;
    errors: Errors;
    onChange?: (formData: any) => void;
    submitButtonText?: string;
    useCancelButton?: boolean;
    confirmButtonClassName?: string;
}