import React, {useMemo} from 'react';

import {Input, Text, VStack} from '@chakra-ui/react';
import {ErrorText} from 'components/chakra/ErrorText/ErrorText';
import {useTranslation} from 'react-i18next';

export const InputWithError = ({ field, id, label, type, autoComplete, placeholder, disabled, errors, form }) => {

    const { t } = useTranslation();

    const { errors: formikErrors } = form;

    const renderErrors = useMemo(() => {
        if (!errors) {
            return null;
        }
        return <ErrorText>{errors.map((el,) => t(el))}</ErrorText>;
    }, [errors, id]);

    const renderFormikErrors = useMemo(() => {
        const formError = formikErrors[id];

        if (formError) {
            return <ErrorText>{formError}</ErrorText>;
        }
    }, [formikErrors, id]);

    return <VStack spacing={'10px'} align={'stretch'}>
        <Text fontSize={'14px'} fontWeight={'bold'}>{`${label?.toUpperCase()}:`}</Text>
        <Input
            type={type}
            isInvalid={errors?.includes(id) || formikErrors?.[id]}
            borderColor={'transparent'}
            variant={'filled'}
            bg={'#2c2c2c'}
            _hover={{ bg: '#2c2c2c' }}
            _focus={{ bg: '#2c2c2c' }}
            borderRadius={'none'}
            height={'50px'}
            errorBorderColor={'crimson'}
            autoComplete={autoComplete}
            isDisabled={disabled}
            placeholder={placeholder}
            {...field}  />
        {renderErrors}
        {renderFormikErrors}
    </VStack>;
};