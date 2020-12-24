import React, {useEffect, useRef, useState} from "react";

import Text from "components/Text.jsx";
import {getParentHeight} from "util/util.js";

import "styles/pages/MainPage.scss"

export default () => {

    const mount = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            setHeight(getParentHeight(mount));
            setWidth(getParentHeight(mount));
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    return <div ref={mount} className={"mainPage"}>
        <div className={"profileSection"}>
            <div className={"profileImage"}/>
            <Text className="profileText" text={"Krzysztof Kucharski"}/>
        </div>
    </div>;
}