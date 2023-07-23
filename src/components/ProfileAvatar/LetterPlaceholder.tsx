import styles from './LetterPlaceHolder.module.scss';

import { DefaultPlaceholder } from '@/components/ProfileAvatar/DefaultPlaceholder';

type DefaultPlaceholderProps = {
    letter: string;
    width?: number;
    height?: number;
}

export const LetterPlaceHolder = (props: DefaultPlaceholderProps) => {

    const { letter, width = 150, height = 150 } = props;

    if (!letter) {
        return <DefaultPlaceholder width={width} height={height}/>;
    }

    return <div className={styles.letterPlaceholder}
        style={{
            width: width,
            height: height
        }}>
        <div className={styles.letter}>
            {letter}
        </div>
    </div>;
};