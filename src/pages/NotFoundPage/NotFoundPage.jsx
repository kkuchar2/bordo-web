import {Text} from "kuchkr-react-component-library";
import {StyledLink, StyledNotFound, StyledNotFoundTextWithIcon, textTheme} from "pages/NotFoundPage/style.js";
import React from 'react';

const NotFoundPage = () => {
    return <StyledNotFound>
        <StyledNotFoundTextWithIcon>
            <img src={"assets/images/problem.png"} alt={""} width={100} height={100}/>
            <Text text={'Page not found'} theme={textTheme}/>
        </StyledNotFoundTextWithIcon>
        <StyledLink style={{marginLeft: 10, marginBottom: 0}} to={'/'} className={"signInLink"}>Home</StyledLink>
    </StyledNotFound>;
};

export default NotFoundPage;