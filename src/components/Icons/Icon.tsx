import React, { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type HeroIcon = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
} & RefAttributes<SVGSVGElement>>;

type ComponentIcon = ({ color }: {
    color: string
}) => React.JSX.Element;

export type IconProps = {
    component: HeroIcon | ComponentIcon;
    color?: string;
    className?: string;
}

export const Icon = (props: IconProps) => {
    const { component: IconComponent, color = 'white', className } = props;

    if (!IconComponent) {
        return null;
    }

    return <IconComponent color={color} className={className}/>;
};