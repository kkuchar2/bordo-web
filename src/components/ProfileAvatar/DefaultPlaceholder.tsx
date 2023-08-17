type DefaultPlaceholderProps = {
    width?: number;
    height?: number;
}

export const DefaultPlaceholder = (props: DefaultPlaceholderProps) => {

    const { width = 150, height = 150 } = props;

    return <div className={'grid place-items-center rounded-full bg-neutral-600/50'}
        style={{
            width: width,
            height: height
        }} />;
};