import { useCallback, useRef } from 'react';

import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import styles from './ChangeAvatarModeSelector.module.scss';
import { ChangeAvatarModeSelectorProps } from './ChangeAvatarModeSelector.types';

export const ChangeAvatarModeSelector = (props: ChangeAvatarModeSelectorProps) => {

    const { onFileSelected, onAnimatedAvatarSelected } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    const openFileSelectionWindow = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    return <div className={'flex items-center justify-center gap-[20px]'}>
        <div className={'flex flex-col items-center justify-center gap-[20px]'}>
            <button onClick={openFileSelectionWindow}
                className={'flex h-[150px] w-[150px] flex-col items-center justify-center gap-[20px] rounded-full'}>
                <CloudArrowUpIcon width={40} color={'#bebebe'}/>
            </button>
            <input type={'file'} accept={'image/*'} ref={inputRef} onChange={onFileSelected} className={'hidden'}/>
            <div className={'font-semibold'}>
                {t('UPLOAD_IMAGE')}
            </div>
        </div>

        <div className={'flex flex-col items-center justify-center gap-[20px]'}>
            <button onClick={onAnimatedAvatarSelected}
                className={'flex h-[150px] w-[150px] flex-col items-center justify-center gap-[20px] rounded-full'}>

                <div className={styles.selectGifCircle}>
                    <Image
                        className={'object-cover'}
                        src={'https://media3.giphy.com/media/lgcUUCXgC8mEo/giphy.gif?'}
                        fill={true}
                        sizes={'150px'}
                        alt={'gif_preview'}
                    />
                </div>
            </button>
            <div className={'font-semibold'}>
                {t('ANIMATED_AVATAR')}
            </div>
        </div>
    </div>;
};
