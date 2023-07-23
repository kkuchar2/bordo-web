import { PersonPlaceholder } from '@/components/svg/PersonPlaceholder';

type DefaultPlaceholderProps = {
    width?: number;
    height?: number;
}

export const DefaultPlaceholder = (props: DefaultPlaceholderProps) => {

    const { width = 150, height = 150 } = props;

    return <div className={'grid place-items-center bg-neutral-800'} style={{
        width: width,
        height: height
    }}>
        <PersonPlaceholder/>
    </div>;
};