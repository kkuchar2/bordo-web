import { FieldValues } from 'react-hook-form/dist/types';

import { FormConfig } from '@/components/Forms/formConfig';
import { ValidationResponse } from '@/queries/base';

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
    config: FormConfig<TFieldValues>;
    initialValues?: TFieldValues;
    title?: string;
    description?: string;
    onSubmit?: (values: TFieldValues) => void;
    onCancel?: any
    disabled?: boolean;
    excludeErrors?: string[];
    validationResponse?: ValidationResponse;
    onChange?: (values: TFieldValues) => void;
    submitButtonTextKey?: string;
    submitButtonClassName?: string;
    useCancelButton?: boolean;
    className?: string;
}