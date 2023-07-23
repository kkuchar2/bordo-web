import React, { useCallback, useMemo, useRef, useState } from 'react';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import styles from './InputWithSmartLabel.module.scss';

import { ButtonWithIcon } from '@/components/ButtonWithIcon/ButtonWithIcon';

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
        autoComplete,
        spellCheck = false,
        errors,
        onBlur,
        onChange
    } = props;

    const [reveal, setReveal] = useState(false);
    const [focused, setFocused] = useState(false);
    const [pointerWithinBounds, setPointerWithinBounds] = useState(false);
    const inputRef = useRef(null);

    const { t } = useTranslation();

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

        return <ButtonWithIcon
            title={reveal ? 'Hide password' : 'Reveal password'}
            onClick={onShowHideClick}
            tabIndex={-1}
            iconColor={'#878787'}
            iconColorHover={'#a5a5a5'}
            icon={{
                size: 20,
                component: reveal ? EyeSlashIcon : EyeIcon
            }}/>;
    }, [type, reveal, onShowHideClick, value]);

    return <div className={styles.inputWithSmartLabel}
        onMouseEnter={() => {
            setPointerWithinBounds(true);
        }}
        onMouseLeave={() => {
            setPointerWithinBounds(false);
        }}>

        <div className={[styles.label, labelActive ? styles.active : ''].join(' ')}>
            {t(label)}
        </div>
        <input
            ref={inputRef}
            id={id}
            name={name}
            type={inputType}
            spellCheck={spellCheck}
            className={styles.input}
            value={value}
            autoComplete={autoComplete}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={() => {
                setFocused(true);
            }}
            onBlur={(e) => {
                setFocused(pointerWithinBounds && e.target.value !== '');
                onBlur?.(e);
            }}/>
        {showHideButton}
    </div>;
};
