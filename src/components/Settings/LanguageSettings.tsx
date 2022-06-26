import React, {useCallback, useEffect, useState} from 'react';

import {RadioGroup} from '@headlessui/react';
import {CheckIcon} from "@heroicons/react/outline";
import {PL, US} from "country-flag-icons/react/3x2";
import i18next from "i18next";

import i18n from "../../i18n";

const languageMap = {
    'en': {
        component: () => <US title="United States"/>,
        name: 'English',

    },
    'pl': {
        component: () => <PL title="Polski"/>,
        name: 'Polski'
    },
};

const LanguageSettings = () => {

    const [selected, setSelected] = useState(localStorage.getItem('i18nextLng'));
    const [supportedLanguages, setSupportedLanguages] = useState([]);

    useEffect(() => {
        setSupportedLanguages(Object.keys(i18next.services.resourceStore.data).sort());
    }, []);

    useEffect(() => {
        i18n.changeLanguage(selected);
    }, [selected]);

    const onChange = useCallback((value: any) => {
        setSelected(value);
    }, []);

    const renderContent = useCallback((active, checked, lang) => {
        const FlagComponent = languageMap[lang].component;

        return <div className="flex flex-grow gap-2 items-center">
            <div className={'w-[30px]'}>
                <FlagComponent/>
            </div>
            {languageMap[lang].name}
            {checked && (
                <div className={"flex justify-end text-white flex-1"}>
                    <CheckIcon className="h-6 w-6"/>
                </div>
            )}
        </div>;
    }, []);

    return <div className="px-4 py-16 xl:w-[600px] md:w-[600px]">
        <div className={''}>
            <RadioGroup className={''} value={selected} onChange={onChange}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                    {supportedLanguages.map((lang) => (
                        <RadioGroup.Option
                            key={lang}
                            value={lang}
                            className={({ active, checked }) =>
                                `${
                                    active
                                        ? ' '
                                        : ''
                                }
                  ${
                                    checked ? 'bg-[#1e1e1e] bg-opacity-75 text-white' : 'bg-[#2e2e2e] '
                                }
                    relative flex cursor-pointer  px-5 py-4 focus:outline-none text-white`
                            }
                        >
                            {({ active, checked }) => renderContent(active, checked, lang)}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    </div>;
};

export default LanguageSettings;