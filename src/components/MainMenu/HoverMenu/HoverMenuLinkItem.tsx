import Link, { LinkProps } from 'next/link';

type HoverMenuItemProps = {
    title: string;
    onClick?: () => void;
}

export const HoverMenuLinkItem = (props: HoverMenuItemProps & LinkProps) => {
    const { title, onClick, ...rest } = props;

    return <Link className={'flex items-center gap-2 px-4 py-2 hover:bg-black/10'} onClick={onClick} {...rest}>
        <div className={'font-medium tracking-tighter text-white/80'}>{title}</div>
    </Link>;
};