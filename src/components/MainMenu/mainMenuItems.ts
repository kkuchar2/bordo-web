import { IconProps } from '@/icon/icon.types';

export interface MainMenuItem {
    id: string;
    url: string;
    displayName: string;
    description: string;
    isAction?: boolean;
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

export const mainMenuItems: MenuItems = {
    pages: {
        groupName: 'PAGES',
        groupItems: {
            Home: {
                id: 'home',
                url: '/home',
                displayName: 'HOME_PAGE',
                description: '',
            },
            Account: {
                id: 'account',
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
                id: 'language',
                url: '/language',
                displayName: 'LANGUAGE',
                description: '',
            }
        }
    },
    actions: {
        groupItems: []
    }
};
