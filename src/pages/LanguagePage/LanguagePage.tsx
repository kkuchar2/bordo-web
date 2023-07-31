'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PL, US } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';

import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { SUPPORTED_LANGUAGES } from '@/config';
import WithAuth from '@/hoc/WithAuth';
import i18n from '@/i18n';

type Flag = {
    name: string;
    component: FC;
    emojiFlag?: string;
}

type RadioCardProps = {
    value: string;
    isChecked: boolean;
    onChange: (value: string) => void;
}

const flags: Record<string, Flag> = {
    en: {
        name: 'English (US)',
        component: () => <US title={'United States'}/>,
        emojiFlag: '🇺🇸',
    },
    pl: {
        name: 'Polski',
        component: () => <PL title={'Poland'}/>,
        emojiFlag: '🇵🇱',
    },
};

const RadioCard = (props: RadioCardProps) => {

    const { value, isChecked, onChange } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const FlagComponent = useMemo(() => {
        return flags[value].component || null;
    }, [value]);

    const onClick = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, [inputRef]);

    return <div
        className={'flex p-6 cursor-pointer items-center gap-3 rounded-md '
            + (isChecked ? 'bg-white/10 hover:bg-white/5  border-[1px] border-transparent' : 'border-[1px] border-white/10')}
        onClick={onClick}>
        <input type={'radio'}
            className={'hidden'}
            checked={isChecked}
            onChange={() => onChange(value)} ref={inputRef}/>
        <div className={'text-sm font-semibold'}>
            {flags[value].name}
        </div>
        <div className={'ml-auto w-8'}>
            <FlagComponent/>
        </div>
    </div>;
};

const LanguagePage = () => {
    const [selected, setSelected] = useState(localStorage.getItem('i18nextLng'));

    const { t } = useTranslation();

    useEffect(() => {

        if (!selected) {
            return;
        }

        i18n.changeLanguage(selected).then(() => {
            showSuccessToast(`${t('LANGUAGE_CHANGED_TO')} ` + flags[selected].name + ' ' + flags[selected].emojiFlag);
        });
    }, [selected]);

    const onChange = useCallback((value: any) => {
        setSelected(value);
    }, []);

    return <div className={'flex h-full flex-col gap-[20px] p-[20px] pt-[100px]'}>
        <h1 className={'text-3xl font-semibold tracking-tighter'}>
            {t('CHANGE_LANGUAGE')}
        </h1>
        <div className={'flex w-[500px] max-w-[500px] flex-col gap-2 p-[10px]'}>
            {SUPPORTED_LANGUAGES.map((value) => (
                <RadioCard
                    isChecked={value === selected}
                    key={value}
                    value={value}
                    onChange={() => onChange(value)}
                />
            ))}
        </div>
    </div>;
};

LanguagePage.displayName = 'Language';

export default WithAuth(LanguagePage, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: false
}) as FC;