import React, { useCallback, useMemo, useRef, useState } from 'react';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from './InputWithSmartLabel.module.scss';

import { ButtonWithIcon } from '@/components/ButtonWithIcon/ButtonWithIcon';

type InputWithSmartLabelProps<TFieldValues extends FieldValues> = {
    value?: PathValue<TFieldValues, Path<TFieldValues>>;
    type: string;
    label: string;
    id: string;
    name: string;
    autoComplete?: string | undefined;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    spellCheck?: boolean | 'true' | 'false';
    errors?: string[];
    isValid?: boolean;
    onBlur?: (e: any) => void;
}

export const InputWithSmartLabel = <TFieldValues extends FieldValues>
(props: InputWithSmartLabelProps<TFieldValues>) => {

    const {
        id,
        name,
        value,
        type,
        label,
        disabled,
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

    const labelActive = value && value !== '' || focused;

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
            value={value || ''}
            autoComplete={autoComplete}
            disabled={disabled}
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
