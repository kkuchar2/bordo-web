import {ElementType} from "react";

import {GlobeIcon, HomeIcon, SparklesIcon, TableIcon, UserIcon} from "@heroicons/react/outline";
import {logout} from "appRedux/services/authService";
import {AppDispatch} from "appRedux/store";
import HomeView from "components/Home/HomeView";
import ModelsView from "components/Models/ModelsView";
import AccountSettings from "components/Settings/AccountSettings";
import AppearanceSettings from "components/Settings/AppearanceSettings";
import LanguageSettings from "components/Settings/LanguageSettings";

import {IconProps} from "../../icon/icon.types";

export interface IViewDescription {
    id: string,
    displayName: string,
    description: string,
    icon?: IconProps,
    component: ElementType
}

export interface IActionDescription {
    id: string,
    displayName: string,
    icon?: IconProps,
    onClick: (dispatch: AppDispatch) => void
}

export interface IMainMenuPages {
    [pageKey: string]: IViewDescription
}

export interface IMainMenuActions {
    [actionKey: string]: IActionDescription
}

export interface IMainMenuItems {
    pages: IMainMenuPages
    actions: IMainMenuActions
}

export const mainMenuItems: IMainMenuItems = {
    pages: {
        "Home": {
            id: 'Home',
            displayName: "HOME_PAGE",
            description: '',
            component: HomeView,
            icon: {
                component: HomeIcon,
                color: 'text-white'
            }
        },
        "TableAdministration": {
            id: 'TableAdministration',
            displayName: "TABLE_ADMINISTRATION",
            description: '',
            component: ModelsView,
            icon: {
                component: TableIcon,
                color: 'text-white'
            }
        },
        "Account": {
            id: 'Account',
            displayName: "ACCOUNT_SETTINGS",
            description: '',
            component: AccountSettings,
            icon: {
                component: UserIcon,
                color: 'text-white'
            }
        },
        "Appearance": {
            id: 'Appearance',
            displayName: "APPEARANCE",
            description: '',
            component: AppearanceSettings,
            icon: {
                component: SparklesIcon,
                color: 'text-white'
            }
        },
        "Language": {
            id: 'Language',
            displayName: "LANGUAGE",
            description: '',
            component: LanguageSettings,
            icon: {
                component: GlobeIcon,
                color: 'text-white'
            }
        }
    },
    actions: {
        "Logout": {
            id: 'Logout',
            displayName: "LOGOUT",
            icon: null,
            onClick: (dispatch: AppDispatch) => dispatch(logout())
        },
    }
};