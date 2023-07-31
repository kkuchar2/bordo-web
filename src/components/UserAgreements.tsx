import { useTranslation } from 'react-i18next';

import { NavLink } from '@/components/NavLink/NavLink';

const UserAgreements = () => {

    const { t } = useTranslation();

    return <div className={'flex grow flex-col justify-end'}>
        <div className={'text-center text-sm'}>
            {t('USER_AGREEMENTS')}
            <NavLink className={'p-2 font-semibold text-white'}
                href={'/userAgreement'}>
                {t('MORE')}
            </NavLink>
        </div>
    </div>;
};

export default UserAgreements;