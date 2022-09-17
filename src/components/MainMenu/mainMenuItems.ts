import {ArrowRightOnRectangleIcon} from '@heroicons/react/20/solid';
import {AxiosConfigs} from 'queries/base';

import {queryClient} from '../../App';
import ApiClient from '../../client';
import {IconProps} from '../../icon/icon.types';

export interface Item {
    id: string;
    url: string;
    displayName: string;
    description: string;
    isAction?: boolean;
    onClick?: () => void;
    icon?: IconProps;
}

export interface ItemsMap {
    [key: string]: Item;
}

export interface Group {
    groupName?: string;
    groupItems: ItemsMap | Item[];
}

export interface MenuItems {
    [groupKey: string]: Group
}

export const mainMenuItems: MenuItems = {
    pages: {
        groupName: 'PAGES',
        groupItems: {
            Home: {
                id: 'Home',
                url: '/home',
                displayName: 'HOME_PAGE',
                description: '',
            },
            Friends: {
                id: 'Friends',
                url: '/friends',
                displayName: 'FRIENDS',
                description: '',
            },
            Chats: {
                id: 'Chats',
                url: '/chats',
                displayName: 'CHATS',
                description: '',
            },
            Account: {
                id: 'Account',
                url: '/account',
                displayName: 'ACCOUNT_SETTINGS',
                description: '',

            }
        }
    },
    personalisation: {
        groupName: 'PERSONALISATION',
        groupItems: {
            Language: {
                id: 'Language',
                url: '/language',
                displayName: 'LANGUAGE',
                description: '',
            }
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
                onClick: async () => {
                    const response = await ApiClient.post('account/logout', {}, { ...AxiosConfigs.WITH_CREDENTIALS_AND_CSRF });
                    if (response.status === 200) {
                        queryClient.removeQueries(['user']);
                        window.location.href = '/';
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

export const findView = (id: string): Item | undefined => {
    for (const key in mainMenuItems) {
        const group = mainMenuItems[key];

        const items = group.groupItems;

        if (typeof items === 'object') {
            for (const groupItemKey in items) {
                const groupItem = items[groupItemKey];
                if (groupItem.id === id) {
                    return groupItem;
                }
            }
        }
    }

    return null;
};
