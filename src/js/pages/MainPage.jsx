import React, {useEffect, useRef, useState} from "react";

import Text from "components/Text.jsx";
import Wave from "react-wavify";
import {getParentHeight, getParentWidth} from "util/util.js";

import "styles/pages/MainPage.scss"

export default () => {

    const mount = useRef(null);
    const [waveHeight, setWaveHeight] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            setWaveHeight(getParentHeight(mount) * 0.2);
        }

        setWaveHeight(getParentHeight(mount) * 0.2);

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    return <div ref={mount} className={"mainPage"}>
        <Wave className="wave" fill="url(#gradient)" options={{
            height: waveHeight,
            amplitude: waveHeight,
            speed: 0.15,
            points: 5
        }}>
            <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#ffffff44"/>
                    <stop offset="90%" stopColor="#ffffff55"/>
                </linearGradient>
            </defs>
        </Wave>
        <Wave className="wave" fill="url(#gradient)" options={{
            height: waveHeight,
            amplitude: waveHeight,
            speed: 0.25,
            points: 2
        }}>
            <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#ffffff22"/>
                    <stop offset="90%" stopColor="#ffffff22"/>
                </linearGradient>
            </defs>
        </Wave>
        <Wave className="wave" fill="url(#gradient)" options={{
            height: waveHeight,
            amplitude: waveHeight * 2,
            speed: 0.19,
            points: 3
        }}>
            <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#ffffff22"/>
                    <stop offset="90%" stopColor="#ffffff22"/>
                </linearGradient>
            </defs>
        </Wave>
        <div className={"profileSection"}>
            <div className={"profileImage"}/>
            <Text className="profileText" text={"Krzysztof Kucharski"}/>
        </div>

    </div>;
}