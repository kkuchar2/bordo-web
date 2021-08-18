import Dashboard from "components/Dashboard/Dashboard.jsx";
import ModelsView from "components/Models/ModelsView.jsx";
import SettingsView from "components/Settings/SettingsView.jsx";
import React from "react";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import TableChartIcon from '@material-ui/icons/TableChart';

export const mainMenuItems = {
    "Dashboard": {
        id: 'Dahsboard',
        displayName: "Dashboard",
        description: null,
        icon: HomeOutlinedIcon,
        component: Dashboard
    },
    "TableAdministration": {
        id: 'TableAdministration',
        displayName: "Table administration",
        description: "Manage all tables exposed by Django backend",
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