import Dashboard from "components/Dashboard/Dashboard.jsx";
import MainMenu from "components/MainMenu/MainMenu.jsx";
import SettingsView from "components/Settings/SettingsView.jsx";
import EnsureAuthorized from "hoc/EnsureAuthorized.jsx";
import { StyledHomePage, StyledHomePageContent, } from "pages/LoggedInHomePage/style.js";
import React, {useCallback, useState} from "react";

const Views = {
    'Dashboard': Dashboard,
    'Settings' : SettingsView
};

const LoggedInHomePage = (props) => {

    const [currentView, setCurrentView] = useState('Settings');

    const renderContent = useCallback(() => {
        const ViewComponent = Views[currentView];
        return <ViewComponent />;
    }, [currentView]);

    const onMenuItemClick = useCallback((name) => {
        setCurrentView(name);
    }, []);

    return <StyledHomePage>
        <StyledHomePageContent>
            <MainMenu onItemClick={onMenuItemClick}/>
            {renderContent()}
        </StyledHomePageContent>
    </StyledHomePage>;
};

export default EnsureAuthorized(LoggedInHomePage);