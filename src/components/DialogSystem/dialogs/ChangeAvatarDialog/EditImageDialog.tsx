import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { Area } from 'react-easy-crop/types';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { generateCroppedImageFile } from '@/components/DialogSystem/dialogs/ChangeAvatarDialog/cropImage';
import { Crop } from '@/components/Image/Crop/Crop';
import { changeAvatar, signAvatarUploadUrl } from '@/queries/account';
import { SignedAvatarUploadInfo, SignedUrl } from '@/queries/account/types';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';
import { useAppDispatch } from '@/state/store';

export type EditImageDialogProps = {
    file: File;
}

export const EditImageDialog = (props: DialogProps<EditImageDialogProps>) => {

    const { data } = props;

    const { file } = data;

    const [image, setImage] = useState<string | null>(null);
    const [croppedArea, setCroppedArea] = useState<Area | null>(null);

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const changeAvatarQuery = changeAvatar();
    const requestSignedUrlQuery = signAvatarUploadUrl();

    const [pending, setPending] = useState(false);

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', onFileReaderLoad);
    }, [file]);

    useEffect(() => {
        if (requestSignedUrlQuery.isSuccess) {
            onSignedUrlReceived(requestSignedUrlQuery.data)
                .then(() => {
                    console.log('File uploaded successfully');
                })
                .catch((error) => {
                    console.error('Error uploading file: ', error);
                })
                .finally(() => {
                    setPending(false);
                });
        }
        else if (requestSignedUrlQuery.isError) {
            console.error('Error requesting signed url: ', requestSignedUrlQuery.error);
            setPending(false);
        }
    }, [requestSignedUrlQuery.isSuccess, requestSignedUrlQuery.isError]);

    const uploadToStaticStorage = useCallback(async (blob: Blob, signedUrl: SignedUrl, file_path: string) => {

        const fields = signedUrl.fields;

        const formData = new FormData();
        Object.keys(fields).forEach((key) => formData.append(key, fields[key]));
        formData.append('file', blob);

        await axios.post(signedUrl.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        await changeAvatarQuery.mutateAsync({ avatar: file_path });
    }, []);

    const onSignedUrlReceived = useCallback(async (data: SignedAvatarUploadInfo) => {
        const { signed_url, file_path } = data;
        const blob = await generateCroppedImageFile(image, croppedArea);
        await uploadToStaticStorage(blob, signed_url, file_path);
    }, [croppedArea, image]);

    const onCancelClick = useCallback(() => {
        dispatch(closeDialog()).then(() => {
        });
    }, []);

    const onConfirmClick = useCallback(() => {
        setPending(true);
        requestSignedUrlQuery.mutate({});
    }, []);

    const onFileReaderLoad = useCallback((e: ProgressEvent<FileReader>) => {
        if (!e.target) {
            return;
        }
        setImage(e.target.result as string);
    }, []);

    const onCroppedAreaChange = useCallback((croppedArea: Area) => {
        setCroppedArea(croppedArea);
    }, []);

    return <div className={'relative flex-col overflow-hidden'}>
        <Crop image={image} onCroppedAreaChange={onCroppedAreaChange}/>
        <div className={'w-fill flex justify-end gap-[20px]'}>
            <button
                className={'min-w-[120px] rounded-md bg-neutral-800 p-2 hover:bg-neutral-600'}
                onClick={onCancelClick}
                disabled={false}>
                {t('CANCEL')}
            </button>
            <button
                className={'min-w-[120px] rounded-md bg-neutral-800 p-2 hover:bg-neutral-600'}
                onClick={onConfirmClick} disabled={false}>
                {t('CONFIRM')}
            </button>
        </div>
        {pending && <div className={'mt-[20px]'}>
            <DelayedTransition pending={true}/>
        </div>}
    </div>;
};