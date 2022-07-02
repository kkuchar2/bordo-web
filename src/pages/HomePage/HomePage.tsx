import React, {useCallback, useEffect} from 'react';

import {closeNavbar, loadLastView, selectorNavbar, selectorTheme, selectorView} from 'appRedux/reducers/application';
import {useAppDispatch} from 'appRedux/store';
import {defaultShowUpAnimation} from 'components/Forms/animation';
import MainMenu from 'components/MainMenu/MainMenu';
import {findView} from 'components/MainMenu/mainMenuItems';
import {showSuccessToast} from 'components/Toast/readyToastNotifications';
import {EnsureAuthorized} from 'hoc/EnsureAuthorized';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {StyledAnimatedHeader, StyledBottomSection, StyledHomePage, StyledTopSection} from './style';

const HomePage = (props: any) => {
    const { show } = props;

    const dispatch = useAppDispatch();

    const navbarState = useSelector(selectorNavbar);

    const currentViewId = useSelector(selectorView);

    const currentTheme = useSelector(selectorTheme);

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

        return <div
            className={`duration-[600ms] transition ease-in-out bg-home-bg-light dark:bg-home-bg-dark flex flex-grow flex-col box-border ${navbarState.opened ? 'blur-[8px]' : 'blur-none'}`}>
            <StyledTopSection>
                <StyledAnimatedHeader {...defaultShowUpAnimation}>
                    <div
                        className={'text-[1.2em] font-semibold text-home-title-light dark:text-home-title-dark'}>{t(view.displayName)}</div>
                </StyledAnimatedHeader>
            </StyledTopSection>
            <StyledBottomSection>
                <ViewComponent/>
            </StyledBottomSection>
        </div>;
    }, [currentViewId, navbarState, t]);

    const onPageClick = useCallback(() => {
        if (navbarState.opened) {
            dispatch(closeNavbar());
        }
    }, [navbarState]);

    if (!show) {
        return <></>;
    }

    const getTheme = useCallback(() => {
        const theme = localStorage.getItem('theme');
        return theme === 'dark' ? 'dark' : 'light';
    }, [currentTheme]);

    return <StyledHomePage className={`${getTheme()} font-sarabun font-semibold`} onClick={onPageClick}>
        <div className={'box-border flex h-auto min-w-[200px] flex-col overflow-hidden lg:h-full lg:flex-row'}>
            <MainMenu currentViewId={currentViewId}/>
            {renderContent()}
        </div>
    </StyledHomePage>;
};

export default EnsureAuthorized(HomePage) as React.FC;
