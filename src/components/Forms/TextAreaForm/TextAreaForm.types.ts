import { StackProps } from '@chakra-ui/react';

import { FormConfig } from '@/form/formConfig';
import { Errors } from '@/tools/client/client.types';

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