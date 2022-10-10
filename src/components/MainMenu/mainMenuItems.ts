import {ArrowRightOnRectangleIcon} from '@heroicons/react/20/solid';
import {AxiosConfigs} from 'queries/base';
import {NavigateFunction} from 'react-router-dom';
import {clearCurrentView, storeCurrentView} from 'state/reducers/application/appSlice';
import {store} from 'state/store';

import {queryClient} from '../../App';
import ApiClient from '../../client';
import {IconProps} from '../../icon/icon.types';

export interface MainMenuItem {
    id: string;
    url: string;
    displayName: string;
    description: string;
    isAction?: boolean;
    onClick?: (navigate: NavigateFunction) => void;
    icon?: IconProps;
}

export interface MainMenuItemsMap {
    [key: string]: MainMenuItem;
}

export interface Group {
    groupName?: string;
    groupItems: MainMenuItemsMap | MainMenuItem[];
}

export interface MenuItems {
    [groupKey: string]: Group
}

const viewSwitchItem = (item: MainMenuItem) => {
    return {
        ...item,
        onClick: (navigate: NavigateFunction) => {
            store.dispatch(storeCurrentView(item.id));
            navigate(item.url);
        }
    };
};

export const mainMenuItems: MenuItems = {
    pages: {
        groupName: 'PAGES',
        groupItems: {
            Home: viewSwitchItem({
                id: 'Home',
                url: '/home',
                displayName: 'HOME_PAGE',
                description: ''
            }),
            Friends: viewSwitchItem({
                id: 'Friends',
                url: '/friends',
                displayName: 'FRIENDS',
                description: '',
            }),
            // Chats: viewSwitchItem({
            //     id: 'Chats',
            //     url: '/chats',
            //     displayName: 'CHATS',
            //     description: '',
            // }),
            Account: viewSwitchItem({
                id: 'Account',
                url: '/account',
                displayName: 'ACCOUNT_SETTINGS',
                description: '',
            })
        }
    },
    personalisation: {
        groupName: 'PERSONALISATION',
        groupItems: {
            Language: viewSwitchItem({
                id: 'Language',
                url: '/language',
                displayName: 'LANGUAGE',
                description: '',
            })
        }
    },
    actions: {
        groupItems: [
            {
                id: 'Logout',
                url: '/logout',
                displayName: 'LOGOUT',
                description: '',
                isAction: true,
                onClick: async (navigate: NavigateFunction) => {
                    const response = await ApiClient.post('account/logout', {}, { ...AxiosConfigs.WITH_CREDENTIALS_AND_CSRF });
                    if (response.status === 200) {
                        queryClient.removeQueries(['user']);
                        store.dispatch(clearCurrentView());
                        navigate('/');
                    }
                },
                icon: {
                    component: ArrowRightOnRectangleIcon,
                    color: 'text-white'
                },
            }
        ]
    }
};