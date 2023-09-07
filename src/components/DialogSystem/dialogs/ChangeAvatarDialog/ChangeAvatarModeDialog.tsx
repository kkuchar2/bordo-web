import { ChangeEvent, useCallback, useRef } from 'react';

import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import styles from './ChangeAvatarModeDialog.module.scss';

import { showEditImageDialog, showSelectGIFDialog } from '@/components/DialogSystem/readyDialogs';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';

export type ChangeAvatarModeDialogProps = {}

export const ChangeAvatarModeDialog = (props: DialogProps<ChangeAvatarModeDialogProps>) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    const openFileSelectionWindow = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    const onAnimatedAvatarSelected = useCallback(() => {
        showSelectGIFDialog();
    }, []);

    const onFileSelected = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            showEditImageDialog(files[0]);
        }
    }, []);

    return <div className={styles.modeSelector}>
        <div className={styles.uploadImageSection}>
            <button onClick={openFileSelectionWindow}>
                <CloudArrowUpIcon width={40} color={'#bebebe'}/>
            </button>
            <input
                type={'file'}
                accept={'image/png, image/jpeg, image/jpg'}
                ref={inputRef} onChange={onFileSelected} className={'hidden'}/>
            <div className={'font-semibold'}>
                {t('UPLOAD_IMAGE')}
            </div>
        </div>

        <div className={styles.animatedAvatarSection}>
            <button onClick={onAnimatedAvatarSelected}>
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