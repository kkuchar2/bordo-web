import { ReactNode } from 'react';

type SettingsSectionProps = {
    title: string;
    children: ReactNode;
    show?: boolean;
}

export const SettingsSection = (props: SettingsSectionProps) => {

    const { title, children, show = true } = props;

    if (!show) {
        return null;
    }

    return <div className={'bg-[rgba(255,255,255,0.02)] p-3'}>
        <div className={'flex gap-[20px] pb-[30px] pt-[10px]'}>
            <div className={'flex w-[40%]'}>
                <div className={'text-md font-medium tracking-tighter text-white/80'}>{title}</div>
            </div>
            <div className={'flex grow justify-end'}>
                {children}
            </div>
        </div>
    </div>;
};