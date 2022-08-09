import {ElementType} from 'react';

import {GlobeIcon, HomeIcon, TableIcon, UserIcon} from '@heroicons/react/outline';
import {LogoutIcon} from '@heroicons/react/solid';
import HomeView from 'components/Home/HomeView';
import {openView} from 'state/reducers/application/appSlice';
import {closeNavbar} from 'state/reducers/navbar/navbarSlice';
import {logout} from 'state/services/accountService';
import {store} from 'state/store';
import TableAdministration from 'views/TableAdministration';

import {IconProps} from '../../icon/icon.types';
import AccountSettings from '../../views/AccountSettings';
import LanguageSettings from '../../views/LanguageSettings';

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
    groupName?: string;
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
                component: TableAdministration,
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
            // Appearance: {
            //     id: 'Appearance',
            //     displayName: 'APPEARANCE',
            //     description: '',
            //     component: AppearanceSettings,
            //         component: SparklesIcon,
            //     icon: {
            //         color: 'text-white'
            //     },
            //     onClick: switchView('Appearance')
            // },
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
        groupItems: [
            {
                id: 'Logout',
                displayName: 'Logout',
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
