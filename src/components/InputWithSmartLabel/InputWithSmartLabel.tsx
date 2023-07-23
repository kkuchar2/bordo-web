import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Flex, Input, Text } from '@chakra-ui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { ButtonWithIcon } from '@/components/chakra/ButtonWithIcon/ButtonWithIcon';

type InputWithSmartLabelProps = {
    value?: string;
    type: string;
    id: string;
    name: string;
    autoComplete?: string | undefined;
    placeholder?: string;
    disabled?: boolean;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    spellCheck?: boolean;
    errors?: string[];
    isValid?: boolean;
    onBlur?: (e: any) => void;
    bg?: string;
}

export const InputWithSmartLabel = (props: InputWithSmartLabelProps) => {

    const {
        id,
        name,
        value,
        type,
        label,
        disabled,
        placeholder,
        autoComplete = 'off',
        spellCheck = false,
        errors,
        onBlur,
        onChange,
        bg = '#272727'
    } = props;

    const [reveal, setReveal] = useState(false);
    const [focused, setFocused] = useState(false);
    const [pointerWithinBounds, setPointerWithinBounds] = useState(false);
    const inputRef = useRef(null);

    const { t } = useTranslation();

    const onDummyInputClick = useCallback(() => {
        setFocused(true);
        inputRef.current.focus();
    }, [inputRef]);

    const labelActive = value && value !== '' || focused;

    const inputType = useMemo(() => {
        if (type !== 'password') {
            return type;
        }
        return reveal ? 'text' : 'password';
    }, [type, reveal]);

    const onShowHideClick = useCallback(() => {
        setReveal(!reveal);
    }, [reveal]);

    const showHideButton = useMemo(() => {
        if (type !== 'password') {
            return null;
        }

        if (value === '') {
            return null;
        }

        return <ButtonWithIcon title={reveal ? 'Hide password' : 'Show password'}
            tabIndex={-1}
            iconSize={20}
            iconColor={'rgba(255,255,255,0.48)'}
            iconColorHover={'white'}
            IconComponent={reveal ? EyeSlashIcon : EyeIcon}
            onClick={onShowHideClick}/>;
    }, [type, reveal, onShowHideClick, value]);

    return <Flex position={'relative'}
        align={'center'}
        pl={'12px'}
        pr={'12px'}
        borderRadius={'6px'}
        justify={'center'}
        onClick={onDummyInputClick}
        height={'56px'}
        bg={bg}
        onMouseEnter={() => {
            setPointerWithinBounds(true);
        }}
        onMouseLeave={() => {
            setPointerWithinBounds(false);
        }}>

        <Text fontSize={labelActive ? '12px' : '14px'}
            position={'absolute'}
            zIndex={1}
            color={labelActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.48)'}
            transition={'0.2s ease all'}
            top={labelActive ? '14px' : '50%'}
            left={'12px'}
            transform={'translateY(-50%)'}
            opacity={disabled ? 0.3 : 0.8}
            fontWeight={'semibold'}>
            {t(label)}
        </Text>
        <Input
            ref={inputRef}
            id={id}
            name={name}
            type={inputType}
            isInvalid={errors?.includes(id)}
            spellCheck={spellCheck}
            borderColor={'transparent'}
            position={'relative'}
            fontSize={'sm'}
            h={'30px'}
            mt={'15px'}
            pl={0}
            pr={0}
            bg={'none'}
            fontWeight={'semibold'}
            focusBorderColor={'none'}
            _hover={{ bg: 'none' }}
            _focus={{ bg: 'none' }}
            _autofill={{
                bg: 'none',
                border: '1px solid transparent',
                textFillWeight: 'bold',
                textFillColor: '#c6c6c6',
                boxShadow: '0 0 0px 1000px transparent inset',
                transition: 'background-color 5000s ease-in-out 0s',
            }}
            value={value}
            borderRadius={'none'}
            errorBorderColor={'crimson'}
            autoComplete={autoComplete}
            isDisabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            _placeholder={{
                color: focused ? 'transparent' : '#a5a5a5',
                fontSize: 'sm',
                fontWeight: 'semibold'
            }}
            onFocus={() => {
                setFocused(true);
            }}
            onBlur={(e) => {
                setFocused(pointerWithinBounds && e.target.value !== '');
                onBlur?.(e);
            }}/>
        {showHideButton}
    </Flex>;
};
