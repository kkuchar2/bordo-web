import MainMenu from "components/MainMenu/MainMenu.jsx";
import {mainMenuItems} from "components/MainMenu/mainMenuItems.js";
import EnsureAuthorized from "hoc/EnsureAuthorized.jsx";
import {Text} from "kuchkr-react-component-library";
import {
    StyledBottomSection,
    StyledContentSection,
    StyledHomePage,
    StyledHomePageContent,
    StyledTopSection, viewDescriptionTextTheme,
    viewTitleTextTheme
} from "pages/HomePage/style.js";
import React, {useCallback, useState} from "react";

const HomePage = (props) => {

    const [currentView, setCurrentView] = useState(mainMenuItems['TableAdministration']);

    const renderContent = useCallback(() => {

        const ViewComponent = currentView.component;

        return <StyledContentSection>
            <StyledTopSection>
                <Text theme={viewTitleTextTheme} text={currentView.displayName}/>
                <Text theme={viewDescriptionTextTheme} text={currentView.description}/>
            </StyledTopSection>
            <StyledBottomSection>
                <ViewComponent/>
            </StyledBottomSection>
        </StyledContentSection>;
    }, [currentView]);

    const onMenuItemClick = useCallback((key) => {
        setCurrentView(mainMenuItems[key]);
    }, []);

    return <StyledHomePage>
        <StyledHomePageContent>
            <MainMenu onItemClick={onMenuItemClick} openedView={currentView}/>
            {renderContent()}
        </StyledHomePageContent>
    </StyledHomePage>;
};

export default EnsureAuthorized(HomePage);