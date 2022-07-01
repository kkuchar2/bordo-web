import React, {useCallback, useEffect} from 'react';

import {closeNavbar, loadLastView, selectorNavbar, selectorView} from 'appRedux/reducers/application';
import {useAppDispatch} from 'appRedux/store';
import {defaultShowUpAnimation} from 'components/Forms/animation';
import MainMenu from 'components/MainMenu/MainMenu';
import {findView} from 'components/MainMenu/mainMenuItems';
import {showSuccessToast} from 'components/Toast/readyToastNotifications';
import {EnsureAuthorized} from 'hoc/EnsureAuthorized';
import {Text} from 'kuchkr-react-component-library';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {
    StyledAnimatedHeader,
    StyledBottomSection,
    StyledContentSection,
    StyledHomePage,
    StyledTopSection,
    viewTitleTextTheme
} from './style';

const HomePage = (props: any) => {
    const { show } = props;

    const dispatch = useAppDispatch();

    const navbarState = useSelector(selectorNavbar);

    const currentViewId = useSelector(selectorView);

    useEffect(() => {
        showSuccessToast('Successfully logged in');
        dispatch(loadLastView());
    }, []);

    const { t } = useTranslation();

    const renderContent = useCallback(() => {
        if (!currentViewId) {
            return null;
        }

        const view = findView(currentViewId);

        const ViewComponent = view.component;

        return <StyledContentSection navbarOpened={navbarState.opened}>
            <StyledTopSection>
                <StyledAnimatedHeader {...defaultShowUpAnimation}>
                    <Text theme={viewTitleTextTheme} text={t(view.displayName)}/>
                </StyledAnimatedHeader>
            </StyledTopSection>
            <StyledBottomSection>
                <ViewComponent/>
            </StyledBottomSection>
        </StyledContentSection>;
    }, [currentViewId, navbarState, t]);

    const onPageClick = useCallback(() => {
        if (navbarState.opened) {
            dispatch(closeNavbar());
        }
    }, [navbarState]);

    if (!show) {
        return <></>;
    }

    return (
        <StyledHomePage className={'font-sarabun font-semibold'} onClick={onPageClick}>
            <div className={'box-border flex h-auto min-w-[200px] flex-col overflow-hidden lg:h-full lg:flex-row'}>
                <MainMenu currentViewId={currentViewId}/>
                {renderContent()}
            </div>
        </StyledHomePage>
    );
};

export default EnsureAuthorized(HomePage) as React.FC;
