import {ElementType} from "react";

import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SettingsIcon from '@material-ui/icons/Settings';
import TableChartIcon from '@material-ui/icons/TableChart';
import ModelsView from "components/Models/ModelsView";
import SettingsView from "components/Settings/SettingsView";
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
        "TableAdministration": {
            id: 'TableAdministration',
            displayName: translation("TABLE_ADMINISTRATION"),
            description: '',
            icon: TableChartIcon,
            component: ModelsView
        },
        "Account": {
            id: 'Account',
            displayName: translation("ACCOUNT_SETTINGS"),
            description: '',
            icon: SettingsIcon,
            component: SettingsView
        }
    };
};