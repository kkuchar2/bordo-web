import React, {useCallback, useState} from "react";

import {defaultShowUpAnimation} from "components/FormComponents/animation";
import MainMenu from "components/MainMenu/MainMenu";
import {IViewDescription, mainMenuItems} from "components/MainMenu/mainMenuItems";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Text} from "kuchkr-react-component-library";

import {
    StyledBottomSection,
    StyledContentSection,
    StyledHomePage,
    StyledHomePageContent,
    StyledTopSection,
    StyledAnimatedHeader,
    viewDescriptionTextTheme,
    viewTitleTextTheme
} from "./style";

const HomePage = () => {

    const [currentView, setCurrentView] = useState<IViewDescription>(mainMenuItems['TableAdministration']);

    const renderContent = useCallback(() => {

        const ViewComponent = currentView.component;

        return <StyledContentSection>
            <StyledTopSection>
                <StyledAnimatedHeader {...defaultShowUpAnimation}>
                    <Text theme={viewTitleTextTheme} text={currentView.displayName}/>
                    <Text theme={viewDescriptionTextTheme} text={currentView.description}/>
                </StyledAnimatedHeader>
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

export default EnsureAuthorized(HomePage) as React.FC;