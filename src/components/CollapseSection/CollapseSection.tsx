import React from 'react';

interface CollapseSectionProps {
    title: string,
    children: React.ReactNode,
    defaultIsOpen?: boolean,
    isDisabled?: boolean,
}

export const CollapseSection = (props: CollapseSectionProps) => {
    const { title, children, ...rest } = props;

    const [show, setShow] = React.useState(false);

    return <div className={'w-full h-[40px] bg-red-500'}>
        <div className={'w-full flex flex-row justify-between items-center cursor-pointer'}
                onClick={() => setShow(!show)}>
            <div className={'text-lg font-bold'}>
                {title}
            </div>
            <div className={'text-lg font-bold'}>
                {show ? '-' : '+'}
            </div>
        </div>
        <div className={'w-full'}>
            {children}
        </div>
    </div>;
};