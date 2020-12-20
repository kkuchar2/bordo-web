import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selectAllCovid} from "redux/features/covidDataSlice.js";

import {getConfig} from "configs/config.js";
import {fetchAsyncGET} from "redux/api/api.js";

import {useEffectInit, useEffectWithNonNull} from "util/util.js";

import "styles/pages/ChartPage.scss"
import Text from "components/Text.jsx";
import Chart from "components/Chart.jsx";

const mapData = data => data.map(d => {
    return {
        x: new Date(d.date),
        y: d.count
    }
});


export default () => {

    const [todayDate, setTodayDate] = useState(0);

    const [todayCases, setTodayCases] = useState(0);
    const [todayCases2, setTodayCases2] = useState(0);


    const [increase, setIncrease] = useState(0);
    const [increase2, setIncrease2] = useState(0);

    const [data2, setData2] = useState([]);

    let data = useSelector(selectAllCovid)

    useEffectInit(() => fetchAsyncGET("covid"), [])

    useEffectWithNonNull(() => {
        setTodayDate(data[data.length - 1].date)

        const previous = data[data.length - 2].count;
        const today = data[data.length - 1].count;
        const inc = 100 * (today - previous) / previous;

        console.log(previous)
        console.log(today)
        console.log(inc)

        setTodayCases(today)

        setIncrease(Math.round((inc + Number.EPSILON) * 100) / 100)

        let tmpData = [data[0]];

        for (let i = 1; i < data.length; i++) {
            tmpData.push({
                id: data[i].id,
                date: data[i].date,
                count: tmpData[i - 1].count + data[i].count
            });
        }

        setData2(tmpData);

    }, [data])

    useEffectWithNonNull(() => {
        const previous2 = data2[data2.length - 2].count;
        const today2 = data2[data2.length - 1].count;
        const inc2 = 100 * (today2 - previous2) / previous2;
        setTodayCases2(today2)
        setIncrease2(Math.round((inc2 + Number.EPSILON) * 100) / 100)
    }, [data2])


    const getIncreaseText = () => increase > 0 ? `+${increase}%` : `${increase}%`;
    const getIncreaseText2 = () => increase2 > 0 ? `+${increase2}%` : `${increase2}%`;

    return <div className={"chartPage"}>
        <div className={"latestTextRow"}>
            <div className={"latestTextWrapper"}>
                <Text className="latestCasesDateText" text={todayDate}/>
                <Text className="latestCasesText" text={`New cases: ${todayCases}`}>
                    <div className={"percent"}>{getIncreaseText()}</div>
                </Text>
                <Text className="latestCasesText" text={`Total cases: ${todayCases2}`}>
                    <div className={"percent"}>{getIncreaseText2()}</div>
                </Text>
            </div>
        </div>
        <div className={"chartWrapper"}>
            <Chart className={"chart"} configFunc={getConfig} mapData={mapData} data={data}/>
        </div>
        <div className={"chartWrapper"}>
            <Chart className={"chart"} configFunc={getConfig} mapData={mapData} data={data2}/>
        </div>
    </div>
}