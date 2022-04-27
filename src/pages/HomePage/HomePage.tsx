import React, {useCallback, useState} from "react";

import {defaultShowUpAnimation} from "components/Forms/animation";
import MainMenu from "components/MainMenu/MainMenu";
import {IViewDescription, mainMenuItems} from "components/MainMenu/mainMenuItems";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {
    StyledBottomSection,
    StyledContentSection,
    StyledHomePage,
    StyledHomePageContent,
    StyledTopSection,
    StyledAnimatedHeader,
    viewTitleTextTheme
} from "./style";

const HomePage = () => {

    const {t} = useTranslation();

    const [currentView, setCurrentView] = useState<IViewDescription>(mainMenuItems(t)['Account']);

    const renderContent = useCallback(() => {

        const ViewComponent = currentView.component;

        return <StyledContentSection>
            <StyledTopSection>
                <StyledAnimatedHeader {...defaultShowUpAnimation}>
                    <Text theme={viewTitleTextTheme} text={currentView.displayName}/>
                </StyledAnimatedHeader>
            </StyledTopSection>
            <StyledBottomSection>
                <ViewComponent/>
            </StyledBottomSection>
        </StyledContentSection>;
    }, [currentView]);

    const onMenuItemClick = useCallback((key) => {
        setCurrentView(mainMenuItems(t)[key]);
    }, [t]);

    return <StyledHomePage>
        {/*<Chat />*/}
        <StyledHomePageContent>
            <MainMenu onItemClick={onMenuItemClick} openedView={currentView}/>
            {renderContent()}
        </StyledHomePageContent>
    </StyledHomePage>;
};

export default EnsureAuthorized(HomePage) as React.FC;