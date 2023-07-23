import { ButtonProps, StackProps } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form/dist/types';

import { FormConfig } from '@/components/Forms/formConfig';
import { QueryResponseErrorData } from '@/queries/base';

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
    config: FormConfig<TFieldValues>;
    initialValues?: TFieldValues;
    title?: string;
    description?: string;
    onSubmit?: (values: TFieldValues) => void;
    onCancel?: any
    disabled?: boolean;
    excludeErrors?: string[];
    error?: QueryResponseErrorData;
    fieldsSpacing?: StackProps['spacing'];
    contentSpacing?: StackProps['spacing'];
    onChange?: (values: TFieldValues) => void;
    submitButtonTextKey?: string;
    useCancelButton?: boolean;
    buttonsStackProps?: StackProps;
    buttonProps?: ButtonProps
    className?: string;
}