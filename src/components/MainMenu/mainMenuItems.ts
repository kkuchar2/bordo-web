import {ElementType} from "react";

import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SettingsIcon from '@material-ui/icons/Settings';
import TableChartIcon from '@material-ui/icons/TableChart';
import ModelsView from "components/Models/ModelsView";
import SettingsView from "components/Settings/SettingsView";

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

export const mainMenuItems: IMainMenuItems = {
    "TableAdministration": {
        id: 'TableAdministration',
        displayName: "Table administration",
        description: '',
        icon: TableChartIcon,
        component: ModelsView
    },
    "Settings": {
        id: 'Settings',
        displayName: "Settings",
        description: "Change account and page settings",
        icon: SettingsIcon,
        component: SettingsView
    }
};