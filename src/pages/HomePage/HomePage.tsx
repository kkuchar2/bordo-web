import React, {useCallback, useEffect} from 'react';

import {Box, Flex, Text} from '@chakra-ui/react';
import MainMenu from 'components/MainMenu/MainMenu';
import {findView, mainMenuItems} from 'components/MainMenu/mainMenuItems';
import {showSuccessToast} from 'components/Toast/readyToastNotifications';
import {EnsureAuthorized} from 'hoc/EnsureAuthorized';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {loadLastView} from 'state/reducers/application/appSlice';
import {closeNavbar} from 'state/reducers/navbar/navbarSlice';
import {RootState, useAppDispatch} from 'state/store';

const HomePage = (props: any) => {

    const { show } = props;

    const dispatch = useAppDispatch();

    const navbarState = useSelector((state: RootState) => state.navbar);
    const currentViewId = useSelector((state: RootState) => state.app.currentView);
    const view = findView(currentViewId);

    useEffect(() => {
        showSuccessToast('Successfully logged in');
        dispatch(loadLastView());
    }, []);

    const { t } = useTranslation();

    const onPageClick = useCallback(() => {
        if (navbarState.opened) {
            dispatch(closeNavbar());
        }
    }, [navbarState]);

    if (!show) {
        return <></>;
    }

    return <Box width={'100%'} onClick={onPageClick}>
        <Flex height={'100%'}>
            <MainMenu items={mainMenuItems} currentViewId={currentViewId}/>
            <Box width={'100%'}>
                <Flex justify={'flex-start'} padding={'30px'}>
                    <Text>{t(view.displayName)}</Text>
                </Flex>
                <view.component/>
            </Box>
        </Flex>
    </Box>;
};

export default EnsureAuthorized(HomePage) as React.FC;
