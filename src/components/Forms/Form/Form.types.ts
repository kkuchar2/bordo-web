import {ButtonProps, StackProps} from '@chakra-ui/react';
import {QueryResponseErrorData} from 'queries/base';

import {FormConfig} from '../../../api/formConfig';

export interface FormProps {
    config: FormConfig;
    initialValues?: object;
    title?: string;
    description?: string;
    onSubmit?: (formData: FormData) => void; // TODO: change to dynamic fields
    onCancel?: any
    disabled?: boolean;
    excludeErrors?: string[];
    error?: QueryResponseErrorData;
    fieldsSpacing?: StackProps['spacing'];
    contentSpacing?: StackProps['spacing'];
    onChange?: (formData: any) => void;
    submitButtonText?: string;
    useCancelButton?: boolean;
    buttonsStackProps?: StackProps;
    fieldBg?: string;
    buttonProps?: ButtonProps
}