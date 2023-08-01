import { useEffect, useRef, useState } from 'react';

import styles from './DelayedSpinner.module.scss';

type DelayedSpinnerProps = {
    pending: boolean;
    delay?: number;
}

export const DelayedSpinner = (props: DelayedSpinnerProps) => {

    const { pending, delay = 300 } = props;

    const timerRef = useRef<number | null>(null);

    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (pending) {
            timerRef.current = window.setTimeout(() => {
                setShowProgress(true);
            }, delay);
        }
        else {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [pending]);

    if (!pending) {
        return null;
    }

    return showProgress && <span className={styles.loader}></span>;
};