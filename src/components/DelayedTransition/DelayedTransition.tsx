import { useEffect, useRef, useState } from 'react';

import styles from './DelayedTransition.module.scss';

type DelayedTransitionProps = {
    pending: boolean;
    delay?: number;
}

export const DelayedTransition = (props: DelayedTransitionProps) => {

    const { pending, delay = 300 } = props;

    const timerRef = useRef<number | null>(null);

    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {

        if (!pending) {
            setShowProgress(false);
            return;
        }

        timerRef.current = window.setTimeout(() => {
            setShowProgress(true);
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [pending]);

    if (!pending || !showProgress) {
        return null;
    }

    return <div className={'relative h-[5px] w-full overflow-hidden rounded-full'}>
        <div className={styles.progressBar}>
            <div className={styles.progressBarValue}/>
        </div>
    </div>;
};