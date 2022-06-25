import React from "react";

interface IconWithBackgroundProps {
    IconComponent: (props: any) => JSX.Element
}

export const IconWithBackground = (props: IconWithBackgroundProps) => {

    const { IconComponent } = props;

    return <div className={'flex items-center justify-center w-[40px] h-[40px] bg-[#1c3545] rounded-full'}>
        <IconComponent className="h-5 w-5 text-[#24a0ed]"/>
    </div>;
};