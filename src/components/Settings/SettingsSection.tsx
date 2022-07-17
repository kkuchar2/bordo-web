import React, {ReactNode} from "react";

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    show?: boolean;
}

export const SettingsSection = (props: SettingsSectionProps) => {

    const { title, description, children, show } = props;

    if (!show) {
        return null;
    }

    return <div className={'flex items-start justify-center flex-col mb-[80px] flex-grow flex-shrink-0'}>
        <div className={'text-gray-400 bold text-[0.8em] font-bold ml-3 sm:ml-0'}>{title.toUpperCase()}</div>
        <hr className={'hidden sm:block border-y-1 border-white opacity-20 w-[100%] my-[10px]'}/>
        {description ? <div className={'text-gray-400 bold text-[0.7em]'}>{description}</div> : null}
        <div
            className={'sm:p-0 mt-[20px] sm:mt-0 w-full'}>
            {children}
        </div>
    </div>;
};

SettingsSection.defaultProps = {
    show: true
};