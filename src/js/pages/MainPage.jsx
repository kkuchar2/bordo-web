import React from 'react';
import Text from "components/Text.jsx";

import "styles/pages/MainPage.scss"

export default () => {
    return <div className={"mainPage"}>
        <div className={"profileSection"}>
            <div className={"profileImage"} />
            <Text className="profileText" text={"Krzysztof Kucharski"} />
            <div className={"line"}/>
        </div>

    </div>;
}