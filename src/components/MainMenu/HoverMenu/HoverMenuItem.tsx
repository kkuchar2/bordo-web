type HoverMenuItemProps = {
    title: string;
    onClick?: () => void;
}

export const HoverMenuItem = (props: HoverMenuItemProps) => {
    const { title, onClick } = props;

    return <button className={'flex w-full items-center gap-2 px-4 py-3 hover:bg-black/10'}
        onClick={onClick}>
        <div className={'font-medium tracking-tighter text-white/80'}>{title}</div>
    </button>;
};