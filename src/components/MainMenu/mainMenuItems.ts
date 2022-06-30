import {ElementType} from 'react';

import {GlobeIcon, HomeIcon, SparklesIcon, TableIcon, UserIcon} from '@heroicons/react/outline';
import {LogoutIcon} from "@heroicons/react/solid";
import {closeNavbar, openView} from 'appRedux/reducers/application';
import {logout} from 'appRedux/services/authService';
import {store} from 'appRedux/store';
import HomeView from 'components/Home/HomeView';
import ModelsView from 'components/Models/ModelsView';
import AccountSettings from 'components/Settings/AccountSettings';
import AppearanceSettings from 'components/Settings/AppearanceSettings';
import LanguageSettings from 'components/Settings/LanguageSettings';

import {IconProps} from '../../icon/icon.types';

export interface Item {
    id: string;
    displayName: string;
    description: string;
    icon?: IconProps;
    component?: ElementType;
    onClick?: () => void;
}

export interface ItemsMap {
    [key: string]: Item;
}

export interface Group {
    groupName: string;
    groupItems: ItemsMap | Item[];
}

export interface MenuItems {
    [groupKey: string]: Group
}

const switchView = (viewName: string) => () => {
    store.dispatch(closeNavbar());
    store.dispatch(openView(viewName));
};

export const mainMenuItems: MenuItems = {
    pages: {
        groupName: 'PAGES',
        groupItems: {
            Home: {
                id: 'Home',
                displayName: 'HOME_PAGE',
                description: '',
                component: HomeView,
                icon: {
                    component: HomeIcon,
                    color: 'text-white'
                },
                onClick: switchView('Home')
            },
            TableAdministration: {
                id: 'TableAdministration',
                displayName: 'TABLE_ADMINISTRATION',
                description: '',
                component: ModelsView,
                icon: {
                    component: TableIcon,
                    color: 'text-white'
                },
                onClick: switchView('TableAdministration')
            },
            Account: {
                id: 'Account',
                displayName: 'ACCOUNT_SETTINGS',
                description: '',
                component: AccountSettings,
                icon: {
                    component: UserIcon,
                    color: 'text-white'
                },
                onClick: switchView('Account')
            }
        }
    },
    personalisation: {
        groupName: 'PERSONALISATION',
        groupItems: {
            Appearance: {
                id: 'Appearance',
                displayName: 'APPEARANCE',
                description: '',
                component: AppearanceSettings,
                icon: {
                    component: SparklesIcon,
                    color: 'text-white'
                },
                onClick: switchView('Appearance')
            },
            Language: {
                id: 'Language',
                displayName: 'LANGUAGE',
                description: '',
                component: LanguageSettings,
                icon: {
                    component: GlobeIcon,
                    color: 'text-white'
                },
                onClick: switchView('Language')
            }
        }
    },
    actions: {
        groupName: 'ACTIONS',
        groupItems: [
            {
                id: 'Logout',
                displayName: 'LOGOUT',
                description: '',
                icon: {
                    component: LogoutIcon,
                    color: 'text-white'
                },
                onClick: () => store.dispatch(logout())
            }
        ]
    }
};

export const findView = (id: string): Item | undefined => {
    console.log('Looking for view: ' + id);

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
