import React, {useCallback, useEffect, useState} from 'react';

import {closeNavbar, loadLastView, openView, selectorNavbar, selectorView} from 'appRedux/reducers/application';
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

    const [view, setView] = useState(null);

    const dispatch = useAppDispatch();

    const navbarState = useSelector(selectorNavbar);

    const viewState = useSelector(selectorView);

    useEffect(() => {
        showSuccessToast('Successfully logged in');
        dispatch(loadLastView());
    }, []);

    useEffect(() => {
        setView(findView(viewState));
    }, [viewState]);

    const { t } = useTranslation();

    const renderContent = useCallback(() => {
        if (!view) {
            return null;
        }

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
    }, [view, navbarState, t]);

    const onMenuItemClick = useCallback(key => {
        dispatch(openView(key));
    }, []);

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
            {/*<Chat />*/}
            <div className={'box-border flex h-auto min-w-[200px] flex-col overflow-hidden lg:h-full lg:flex-row'}>
                <MainMenu onItemClick={onMenuItemClick} openedView={view}/>
                {renderContent()}
            </div>
        </StyledHomePage>
    );
};

export default EnsureAuthorized(HomePage) as React.FC;
