import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Icon, IconProps } from '@/components/Icons/Icon';

export type HoverMenuLinkItemProps = {
    href: string;
    title: string;
    onClick?: () => void;
    icon?: IconProps;
}

export const HoverMenuLinkItem = (props: HoverMenuLinkItemProps) => {
    const { title, onClick, icon, href } = props;

    const { t } = useTranslation();

    return <Link className={'flex items-center gap-2 px-4 py-3 hover:bg-black/10'} onClick={onClick} href={href}>
        {icon && <Icon {...icon}/>}
        <div className={'font-medium tracking-tighter text-white/80'}>{t(title)}</div>
    </Link>;
};