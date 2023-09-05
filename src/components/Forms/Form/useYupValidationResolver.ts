import { useCallback } from 'react';

import { FieldValues, Resolver } from 'react-hook-form';
import { ObjectSchema, ValidationError } from 'yup';

const useYupValidationResolver = <TFieldValues extends FieldValues = FieldValues>(
    validationSchema: ObjectSchema<TFieldValues> | undefined
): Resolver<TFieldValues, any> | undefined => {

    if (!validationSchema) {
        throw new Error('No validation schema provided');
    }

    return useCallback(
        async (data: TFieldValues) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            }
            catch (errors) {
                if (errors instanceof ValidationError)
                    return {
                        values: {},
                        errors: errors.inner.reduce(
                            (allErrors, currentError) => ({
                                ...allErrors,
                                [currentError.path!]: {
                                    type: currentError.type ?? 'validation',
                                    message: currentError.message,
                                },
                            }),
                            {}
                        ),
                    };

                throw new Error('Error trying to validate form schema');
            }
        },
        [validationSchema]
    );
};

export default useYupValidationResolver;