import React from "react";

import {Button, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {messageTheme, resendButtonTheme, StyledMessageWrapper, StyledUnverifiedAccount, titleTheme} from "./style";

interface AccountUnverifiedProps {
    show: boolean;
}

const AccountUnverified = (props: AccountUnverifiedProps) => {

    const { show } = props;

    const { t } = useTranslation();

    if (!show) {
        return null;
    }

    return <StyledUnverifiedAccount>
        <Text theme={titleTheme} text={t("UNVERIFIED_ACCOUNT")}/>
        <StyledMessageWrapper>
            <Text theme={messageTheme} text={t('UNVERIFIED_ACCOUNT_MESSAGE')}/>
            <Button theme={resendButtonTheme} text={t('RESEND_VERIFICATION_MAIL')}/>
        </StyledMessageWrapper>
    </StyledUnverifiedAccount>;
};

export default AccountUnverified;