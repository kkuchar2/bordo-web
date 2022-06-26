import React, { useCallback, useEffect, useState } from 'react';

import { closeNavbar, selectorNavbar } from 'appRedux/reducers/application';
import { useAppDispatch } from 'appRedux/store';
import { defaultShowUpAnimation } from 'components/Forms/animation';
import MainMenu from 'components/MainMenu/MainMenu';
import { IViewDescription, mainMenuItems } from 'components/MainMenu/mainMenuItems';
import { showSuccessToast } from 'components/Toast/readyToastNotifications';
import { EnsureAuthorized } from 'hoc/EnsureAuthorized';
import { Text } from 'kuchkr-react-component-library';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  StyledAnimatedHeader,
  StyledBottomSection,
  StyledContentSection,
  StyledHomePage,
  StyledTopSection,
  viewTitleTextTheme
} from './style';

const HomePage = (props: any) => {
  const [currentView, setCurrentView] = useState<IViewDescription>(mainMenuItems.pages['Language']);

  const { show } = props;

  const dispatch = useAppDispatch();

  const navbarState = useSelector(selectorNavbar);

  useEffect(() => {
    showSuccessToast('Successfully logged in');
  }, []);

  const { t } = useTranslation();

  const renderContent = useCallback(() => {
    const ViewComponent = currentView.component;
    console.log('Display name: ', currentView.displayName);

    return (
      <StyledContentSection navbarOpened={navbarState.opened}>
        <StyledTopSection>
          <StyledAnimatedHeader {...defaultShowUpAnimation}>
            <Text theme={viewTitleTextTheme} text={t(currentView.displayName)} />
          </StyledAnimatedHeader>
        </StyledTopSection>
        <StyledBottomSection>
          <ViewComponent />
        </StyledBottomSection>
      </StyledContentSection>
    );
  }, [currentView, navbarState, t]);

  const onMenuItemClick = useCallback((key) => {
    setCurrentView(mainMenuItems.pages[key]);
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
    <StyledHomePage onClick={onPageClick}>
      {/*<Chat />*/}
      <div className={'box-border flex h-auto min-w-[200px] flex-col overflow-hidden xl:h-full xl:flex-row'}>
        <MainMenu onItemClick={onMenuItemClick} openedView={currentView} />
        {renderContent()}
      </div>
    </StyledHomePage>
  );
};

export default EnsureAuthorized(HomePage) as React.FC;
