import React, {useCallback, useEffect, useState} from "react";

import {RadioGroup} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/outline";
import {changeTheme} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";

const availableThemes = {
    light: {
        name: 'Light',
    },
    dark: {
        name: 'Dark',
    }
};

const AppearanceSettings = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeTheme(currentTheme));
    }, [currentTheme]);

    const onChange = useCallback((value: any) => {
        setCurrentTheme(value);
    }, []);

    const renderContent = useCallback((active, checked, theme) => {
        return <div className="flex flex-grow gap-2 items-center">
            <div className={'w-[30px]'}>

            </div>
            {availableThemes[theme].name}
            {checked && (
                <div className={"flex justify-end text-white flex-1"}>
                    <CheckIcon className="h-6 w-6"/>
                </div>
            )}
        </div>;
    }, []);

    return <div className="px-4 py-16 xl:w-[600px] md:w-[600px]">
        <div className={''}>
            <RadioGroup className={''} value={currentTheme} onChange={onChange}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                    {Object.keys(availableThemes).map((theme) => (
                        <RadioGroup.Option
                            key={theme}
                            value={theme}
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
                            {({ active, checked }) => renderContent(active, checked, theme)}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    </div>;
};

export default AppearanceSettings;