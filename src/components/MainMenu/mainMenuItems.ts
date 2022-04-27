import {ElementType} from "react";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import { SvgIcon } from '@mui/material';
import HomeView from "components/Home/HomeView";
import ModelsView from "components/Models/ModelsView";
import AccountSettings from "components/Settings/AccountSettings";
import ProfileSettings from "components/Settings/ProfileSettings";
import {TFunction} from "react-i18next";

export interface IViewDescription {
    id: string,
    displayName: string,
    description: string,
    icon: typeof SvgIcon,
    component: ElementType
}

export interface IMainMenuItems {
    [menuKey: string]: IViewDescription
}

export const mainMenuItems = (translation: TFunction<"translation">): IMainMenuItems => {
    return {
        "Home": {
            id: 'Home',
            displayName: translation("HOME_PAGE"),
            description: '',
            icon: HomeRoundedIcon,
            component: HomeView
        },
        "TableAdministration": {
            id: 'TableAdministration',
            displayName: translation("TABLE_ADMINISTRATION"),
            description: '',
            icon: TableViewRoundedIcon,
            component: ModelsView
        },
        "UserProfile": {
            id: 'UserProfile',
            displayName: translation("USER_PROFILE"),
            description: '',
            icon: PersonRoundedIcon,
            component: ProfileSettings
        },
        "Account": {
            id: 'Account',
            displayName: translation("ACCOUNT_SETTINGS"),
            description: '',
            icon: SettingsApplicationsRoundedIcon,
            component: AccountSettings
        }
    };
};