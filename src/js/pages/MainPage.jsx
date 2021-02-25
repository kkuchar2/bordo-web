import React from "react";
import Text from "components/Text";

import "styles/pages/MainPage.scss"

export default () => {

    return <div className={"mainPage"}>
        <div className={"profileSection"}>
            <div className={"profileTextWrapper"}>
                <Text className="profileText" text={"Hello, I'm "}/>
                <Text className="profileText name" text={'Krzysztof Kucharski,'}/>
                <Text className="profileText" text={" and I'm a software engineer"}/>
            </div>
        </div>
    </div>;
}