import Link, { LinkProps } from 'next/link';

import { Icon, IconProps } from '@/components/Icons/Icon';

type HoverMenuItemProps = {
    title: string;
    onClick?: () => void;
    icon?: IconProps;
}

export const HoverMenuLinkItem = (props: HoverMenuItemProps & LinkProps) => {
    const { title, onClick, icon, ...rest } = props;

    return <Link className={'flex items-center gap-2 px-4 py-3 hover:bg-black/10'} onClick={onClick} {...rest}>
        {icon && <Icon {...icon}/>}
        <div className={'font-medium tracking-tighter text-white/80'}>{title}</div>
    </Link>;
};