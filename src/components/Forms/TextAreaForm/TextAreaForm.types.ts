import {StackProps} from '@chakra-ui/react';
import {Errors} from 'tools/client/client.types';

import {FormConfig} from '../../../api/formConfig';

export interface TextAreaFormProps {
    config: FormConfig;
    initialValues?: object;
    title?: string;
    description?: string;
    onSubmit?: (formData: FormData) => void; // TODO: change to dynamic fields
    onCancel?: any
    disabled?: boolean;
    errors: Errors;
    fieldsSpacing?: StackProps['spacing'];
    contentSpacing?: StackProps['spacing'];
    onChange?: (formData: any) => void;
    submitButtonTextKey?: string;
    useCancelButton?: boolean;
    buttonsStackProps?: StackProps
}