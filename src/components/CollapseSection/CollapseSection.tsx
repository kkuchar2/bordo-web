import React from 'react';

interface CollapseSectionProps {
    className?: string;
    title: string,
    children: React.ReactNode,
    defaultIsOpen?: boolean,
    isDisabled?: boolean,
    actionButtonRenderer?: () => React.ReactNode,
}

export const CollapseSection = (props: CollapseSectionProps) => {
    const { title, children, className, defaultIsOpen = true, actionButtonRenderer } = props;

    const [show, setShow] = React.useState(defaultIsOpen);

    return <div className={['w-full flex flex-col', className].join(' ')}>
        <div className={'w-full flex justify-between items-center cursor-pointer'}>
            <div className={'flex items-center gap-2 w-full bg-gray-100/10 select-none'}>
                <div className={'flex items-center grow gap-2 p-2'} onClick={() => setShow(!show)}>
                    <svg className={'w-6 h-6'.concat(show ? ' transform rotate-[0deg]' : 'transform rotate-[270deg]')}
                         viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                    <div className={'text text-sm font-semibold'}>{title}</div>
                </div>
                <div className={'p-2'}>
                    {actionButtonRenderer && actionButtonRenderer()}
                </div>
            </div>
        </div>
        <div className={'w-full grow flex flex-col select-none'.concat(show ? ' flex-grow' : ' hidden')}>
            {show && children}
        </div>
    </div>;
};
