import React, { useCallback, useMemo } from 'react';

import { MenuAlt3Icon } from '@heroicons/react/solid';
import { closeNavbar, openNavbar, selectorNavbar } from 'appRedux/reducers/application';
import { useAppDispatch } from 'appRedux/store';
import { IViewDescription, mainMenuItems } from 'components/MainMenu/mainMenuItems';
import MenuItem from 'components/MainMenu/MenuItem/MenuItem';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export interface MainMenuProps {
  onItemClick: Function;
  openedView: IViewDescription;
}

const MainMenu = (props: MainMenuProps) => {
  const { onItemClick, openedView } = props;

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const isMobile = useMediaQuery('(max-width: 640px)');

  const navbarState = useSelector(selectorNavbar);

  const onMenuItemClick = useCallback(
    (key) => {
      onItemClick?.(key);
      dispatch(closeNavbar());
    },
    [onItemClick]
  );

  const menuPageItems = useMemo(() => {
    return Object.entries(mainMenuItems.pages).map((item) => {
      const [key, value] = item;
      return (
        <MenuItem
          key={value.id}
          name={t(value.displayName)}
          icon={value.icon}
          onClick={() => onMenuItemClick(key)}
          active={openedView.id === value.id}
        />
      );
    });
  }, [openedView, onMenuItemClick, t]);

  const menuActionItems = useMemo(() => {
    return Object.entries(mainMenuItems.actions).map((item) => {
      const [, value] = item;
      return (
        <MenuItem
          key={value.id}
          icon={value.icon}
          name={t(value.displayName)}
          onClick={() => value.onClick(dispatch)}
        />
      );
    });
  }, [openedView, onMenuItemClick, t]);

  const onHamburgerClick = useCallback(() => {
    dispatch(openNavbar());
  }, []);

  const renderHamburgerButton = useMemo(() => {
    if (navbarState.opened) {
      return null;
    }

    if (!isMobile) {
      return null;
    }
    return (
      <MenuAlt3Icon
        className={`absolute top-[25px] right-[25px] mr-0 h-10 w-10 cursor-pointer text-white`}
        onClick={onHamburgerClick}
      />
    );
  }, [isMobile, navbarState]);

  const renderSeparator = useMemo(() => {
    return <hr className={`border-solid border-gray-300 border-opacity-25`} />;
  }, []);

  const renderMenuItems = useMemo(() => {
    return (
      <div
        className={
          'absolute top-0 right-0 flex h-full w-[300px] w-[75%] flex-col gap-[15px] bg-[#2e2e2e]/50 p-3 pt-3 pb-3 ' +
          'backdrop-blur-xl sm:relative sm:flex-row sm:bg-none sm:p-0 lg:flex-row xl:flex-col xl:gap-[5px] xl:pt-0 xl:pb-0'
        }
      >
        <div className={'mb-[10px] hidden text-white xl:block'}>{t('PAGES')}</div>
        {menuPageItems}
        {renderSeparator}
        {menuActionItems}
        {renderSeparator}
      </div>
    );
  }, [t]);

  if (isMobile && !navbarState.opened) {
    return renderHamburgerButton;
  }

  return (
    <div
      className={'absolute z-[15] box-border h-full w-full p-[15px] sm:relative sm:h-auto sm:w-auto sm:bg-[#2e2e2e]'}
    >
      {renderMenuItems}
    </div>
  );
};

export default MainMenu;
