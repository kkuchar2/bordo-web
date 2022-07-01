import React, {useCallback, useEffect, useMemo} from 'react';

import {MenuAlt3Icon} from '@heroicons/react/solid';
import {closeNavbar, openNavbar, selectorNavbar} from 'appRedux/reducers/application';
import {useAppDispatch} from 'appRedux/store';
import {Group, Item, mainMenuItems} from 'components/MainMenu/mainMenuItems';
import MenuItem from 'components/MainMenu/MenuItem/MenuItem';
import {useMediaQuery} from 'hooks/useMediaQuery';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

export interface MainMenuProps {
    currentViewId: string;
}

const MainMenu = (props: MainMenuProps) => {
    const { currentViewId } = props;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const isSmall = useMediaQuery('(max-width: 1280px)');

    const navbarState = useSelector(selectorNavbar);

    const onHamburgerClick = useCallback(() => {
        dispatch(openNavbar());
    }, []);

    const renderHamburgerButton = useMemo(() => {
        if (navbarState.opened) {
            return null;
        }

        if (!isSmall) {
            return null;
        }
        return <MenuAlt3Icon
            className={`absolute top-[25px] right-[25px] mr-0 h-10 w-10 cursor-pointer text-white`}
            onClick={onHamburgerClick}
        />;
    }, [isSmall, navbarState]);

    const renderGroup = useCallback((group: Group) => {
        const groupName = group.groupName;
        const items = group.groupItems;

        if (Array.isArray(items)) {
            return <div className={'pt-[10px] pb-[10px] flex flex-col gap-1'}>
                {items.map((item: Item, idx: number) => {
                    return <MenuItem icon={item.icon} key={idx} name={t(item.displayName)} onClick={item.onClick}/>;
                })}
            </div>;
        }

        return <div className={'lg:pt-[20px] pb-[10px] flex flex-col gap-1'}>
            <div className={'text-[12px] ml-[10px] font-semibold text-gray-400'}>
                {t(groupName).toUpperCase()}
            </div>

            {Object.entries(items).map(([key, item]) => {
                return <MenuItem
                    key={key}
                    name={t(item.displayName)}
                    active={currentViewId === item.id}
                    icon={item.icon}
                    onClick={item.onClick}/>;
            })}
        </div>;
    }, [currentViewId, t]);

    const getTranslation = useCallback(() => {
        if (!isSmall) {
            return '';
        }

        return navbarState.opened ? 'translate-x-0' : 'translate-x-[100%]';
    }, [isSmall, navbarState]);

    const getTransition = useCallback(() => {
        return isSmall ? 'transition duration-300 ease-in-out' : '';
    }, [isSmall]);

    useEffect(() => {
        if (!isSmall) {
            dispatch(closeNavbar());
        }
    }, [isSmall]);

    const navbarItems = useMemo(() => {
        return <div
            className={'flex flex-col h-full sm:gap-[20px] lg:gap-[0px] md:w-full lg:w-[75%]'}>
            {Object.entries(mainMenuItems).map(([key, group]) =>
                <div key={key}>
                    {renderGroup(group)}
                    <hr className={`ml-[10px] border-1 border-gray-300 border-opacity-10`}/>
                </div>)}
        </div>;
    }, [currentViewId, t]);

    const renderLargeScreenNavbar = useMemo(() => {
        return <nav
            className={`backdrop-blur-xl bg-[#2e2e2e]/90 flex h-full justify-end p-[15px] w-[300px]`}>
            {navbarItems}
        </nav>;
    }, [t, navbarItems]);

    const renderSmallScreenNavbar = useMemo(() => {
        return <>
            {!navbarState.opened ? renderHamburgerButton : null}
            <nav
                className={`${getTranslation()} ${getTransition()}  fixed backdrop-blur-xl bg-[#1d1d1d]/90 top-0 right-0 z-[15] h-full w-[75%] max-w-[300px] items-end p-[15px]`}>
                {navbarItems}
            </nav>
        </>;
    }, [navbarItems, navbarState, isSmall, t]);

    return useMemo(() => {
        if (isSmall) {
            return renderSmallScreenNavbar;
        }
        return renderLargeScreenNavbar;
    }, [currentViewId, isSmall, navbarState, t]);
};

export default MainMenu;
