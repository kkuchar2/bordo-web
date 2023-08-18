'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DE, ES, FR, PL, US } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';

import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { SUPPORTED_LANGUAGES } from '@/config';
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
    es: {
        name: 'Español',
        component: () => <ES title={'Spain'}/>,
        emojiFlag: '🇪🇸',
    },
    fr: {
        name: 'Français',
        component: () => <FR title={'France'}/>,
        emojiFlag: '🇫🇷',
    },
    de: {
        name: 'Deutsch',
        component: () => <DE title={'Germany'}/>,
        emojiFlag: '🇩🇪',
    }
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

        if (i18n.language === selected) {
            return;
        }

        i18n.changeLanguage(selected).then(() => {
            showSuccessToast(`${t('LANGUAGE_CHANGED_TO')} ` + flags[selected].name + ' ' + flags[selected].emojiFlag);
        });
    }, [selected]);

    const onChange = useCallback((value: any) => {
        setSelected(value);
    }, []);

    return <div className={'h-full w-full bg-neutral-800'}>
        <div className={'h-full w-full overflow-auto'}>
            <div className={'flex max-w-[800px] flex-col gap-[30px] p-[50px]'}>
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
            </div>
        </div>
    </div>;
};

export default LanguagePage;