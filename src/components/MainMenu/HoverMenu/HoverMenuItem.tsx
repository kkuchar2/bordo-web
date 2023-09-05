import { Icon, IconProps } from '@/components/Icons/Icon';

export type HoverMenuItemProps = {
    title: string;
    onClick?: () => void;
    icon?: IconProps;
}

export const HoverMenuItem = (props: HoverMenuItemProps) => {
    const { title, onClick, icon } = props;

    return <button className={'flex w-full items-center gap-2 px-4 py-3 hover:bg-black/10'}
        onClick={onClick}>
        {icon && <Icon {...icon}/>}
        <div className={'font-medium tracking-tighter text-white/80'}>{title}</div>
    </button>;
};