import { useTranslation } from 'react-i18next';

import { showChangeAvatarDialog } from '@/components/DialogSystem/readyDialogs';
import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';

export const EditableProfilePictureProperty = () => {

    const { t } = useTranslation();

    return <div className={'relative hover:cursor-pointer'} onClick={showChangeAvatarDialog}>
        <div className={'overflow-hidden rounded-full'}>
            <ProfileAvatar width={150} height={150} fill={false}/>
        </div>
        <div
            className={'absolute left-0 top-0 flex size-full items-center justify-center rounded-full bg-[#2e2e2e] opacity-0 hover:bg-[rgba(46,46,46,0.8)] hover:opacity-100'}>
            <div className={'text-sm font-semibold'}>
                {t('CHANGE_AVATAR')}
            </div>
        </div>
    </div>;
};