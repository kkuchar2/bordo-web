import React from "react";

import {useTranslation} from "react-i18next";

const UserAgreements = () => {
    const { t } = useTranslation();

    return <div className={'form-description mt-4'}>
            <span>
                {t('USER_AGREEMENTS_PT1')}
                <a className={'link'} href={'/userAgreement'}>{t('USER_AGREEMENTS_PT2')}</a>
                {t('USER_AGREEMENTS_PT3')}
                <a className={'link'} href={'/'}>{t('USER_AGREEMENTS_PT4')}</a>
            </span>
        </div>;
};

export default UserAgreements;