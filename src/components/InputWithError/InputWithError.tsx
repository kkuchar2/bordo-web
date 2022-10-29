import React, {useCallback, useMemo, useState} from 'react';

import {Input, InputGroup, InputRightElement, Text, VStack} from '@chakra-ui/react';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/solid';
import {ButtonWithIcon} from 'components/chakra/ButtonWithIcon/ButtonWithIcon';
import {ErrorText} from 'components/chakra/ErrorText/ErrorText';
import {useTranslation} from 'react-i18next';

export const InputWithError = ({ field, id, label, type, autoComplete, placeholder, disabled, errors, form }) => {

    const { t } = useTranslation();

    const { errors: formikErrors } = form;

    const [show, setShow] = useState(false);
    const [focused, setFocused] = useState(false);
    const [pointerWithinBounds, setPointerWithinBounds] = useState(false);

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

    const inputType = useMemo(() => {
        if (type !== 'password') {
            return type;
        }
        return show ? 'text' : 'password';
    }, [type, show]);

    const onShowHideClick = useCallback(() => {
        setShow(!show);
    }, [show]);

    const showHideButton = useMemo(() => {
        if (type !== 'password') {
            return null;
        }

        if (field.value === '') {
            return null;
        }

        return <InputRightElement width={'4.5rem'} height={'100%'}>
            <ButtonWithIcon title={show ? 'Hide password' : 'Show password'}
                            iconSize={20}
                            iconColor={'rgba(255,255,255,0.48)'}
                            iconColorHover={'white'}
                            IconComponent={show ? EyeSlashIcon : EyeIcon}
                            onClick={onShowHideClick}/>
        </InputRightElement>;
    }, [type, show, onShowHideClick, field.value]);

    return <VStack spacing={'7px'} align={'stretch'} position={'relative'}>
        {focused ? <Text fontSize={'12px'}
                         zIndex={1}
                         top={0}
                         left={3}
                         opacity={disabled ? 0.3 : 1}
                         fontWeight={'bold'}>{label}</Text> : null}

        <InputGroup size={'md'}
                    onMouseEnter={() => {
                        setPointerWithinBounds(true);
                    }}
                    onMouseLeave={() => {
                        setPointerWithinBounds(false);
                    }}>
            <Input
                type={inputType}
                isInvalid={errors?.includes(id) || formikErrors?.[id]}
                borderColor={'transparent'}
                variant={'filled'}
                fontSize={'sm'}
                fontWeight={'semibold'}
                focusBorderColor={'none'}
                bg={'#35373b'}
                _hover={{ bg: '#35373b' }}
                _focus={{ bg: '#35373b' }}
                borderRadius={'none'}
                height={'50px'}
                errorBorderColor={'crimson'}
                autoComplete={autoComplete}
                isDisabled={disabled}
                placeholder={placeholder}
                _placeholder={{
                    color: focused ? 'transparent' : '#a5a5a5',
                    fontSize: 'sm',
                    fontWeight: 'semibold'
                }}
                {...field}
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={(e) => {
                    setFocused(pointerWithinBounds);
                    field.onBlur(e);
                }}/>
            {showHideButton}
        </InputGroup>
        {renderErrors}
        {renderFormikErrors}
    </VStack>;
};
