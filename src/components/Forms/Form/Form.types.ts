import {Errors} from 'tools/client/client.types';

import {FormConfig} from '../../../api/formConfig';

export interface FormProps {
    config: FormConfig;
    initialValues?: object;
    title?: string;
    description?: string;
    onSubmit?: (formData: FormData) => void; // TODO: change to dynamic fields
    onCancel?: any
    disabled: boolean;
    errors: Errors;
    onChange?: (formData: any) => void;
    submitButtonText?: string;
    useCancelButton?: boolean;
}