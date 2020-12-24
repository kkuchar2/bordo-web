import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {selectAllCovidStats} from "../redux/features/covidStatsDataSlice.js";
import {selectAllCovidCalcs} from "../redux/features/covidCalcsDataSlice.js";

import {fetchAsyncGET} from "redux/api/api.js";
import {useEffectInit, useEffectWithNonNull} from "util/util.js";

import Text from "components/Text.jsx";
import Chart from "components/Chart.jsx";

import {zoomChartConfig} from "configs/chart/zoomChartConfig";
import {casesRecoveriesConfig} from "configs/chart/casesRecoveriesConfig";
import {casesCumulativeConfig} from "configs/chart/casesCumulative";
import {recoveriesConfig} from "configs/chart/recoveriesConfig";
import {deathsConfig} from "configs/chart/deathsConfig";

import "styles/pages/ChartPage.scss"
import {mapDates} from "configs/chart/common";

const mapDate = data => data.map(entry => {
    return {x: new Date(entry.date)}
});

const mapDateFields = (data, fieldNames) => data.map(entry => {
    const mapped = {x: new Date(entry.date)}
    fieldNames.forEach(fieldName => mapped[fieldName] = entry[fieldName]);
    return mapped;
});

export default () => {
    const [todayDate, setTodayDate] = useState(0);
    const [todayCases, setTodayCases] = useState(0);
    const [todayCases2] = useState(0);

    const [zoomListenersMap] = useState({});

    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(0);

    let data = useSelector(selectAllCovidStats);
    let calcs_data = useSelector(selectAllCovidCalcs);

    useEffectInit(() => fetchAsyncGET("covid_stats"), [])

    useEffectWithNonNull(() => {
        setTodayDate(data[data.length - 1].date)
        setTodayCases(data[data.length - 1].cases_daily)
        setRangeEnd(data.length - 1);
    }, [data])

    const zoomCallbackProvider = (name, func) => zoomListenersMap[name] = func;

    const onZoomChange = zoom => {
        setRangeStart(zoom.startValue);
        setRangeEnd(zoom.endValue);
    }

    const renderNoData = () => {
        if (data.length > 0) {
            return;
        }
        return <div className={"emptyData"}>
            <div>Brak danych</div>
        </div>
    }

    const renderChart = (name, configFunc, fields, data) => {
        if (data.length === 0) {
            return;
        }
        return <div className={"chartWrapper"}>
            <Chart className={"chart"} configFunc={configFunc}
                   name={name}
                   mapData={d => mapDateFields(d, fields)} data={data}
                   zoomCallbackProvider={zoomCallbackProvider}/>
        </div>
    }

    const renderInfo = () => <div className={"latestTextWrapper"}>
            <Text className="latestCasesDateText" text={todayDate}/>
            <Text className="latestCasesText" text={`Liczba nowych przypadków: ${todayCases}`} />
        </div>

    const renderDescriptionRow = () => {
        if (data.length === 0) {
            return;
        }
        return <div className={"latestTextRow"}>
            <Text className="title" text={"Koronawirus w Polsce (SARS-CoV-2)"}/>
            {renderInfo()}
        </div>
    }

    const renderDataRange = () => {
        if (data.length === 0) {
            return;
        }
        let dates = mapDates(mapDate(data));
        return <div className={"dataRangeTextRow"}>
            <Text className="dataRangeText" text={`${dates[rangeStart]} - ${dates[rangeEnd]}`}/>
        </div>
    };

    const renderZoomControlChart = (configFunc, data) => {
        if (data.length === 0) {
            return;
        }
        return <div className={"zoomRow"}>
            <div className={"chartWrapper"}>
                <Chart className={"chart"} configFunc={configFunc}
                       mapData={d => mapDateFields(d, [])} data={data}
                       onZoomChange={onZoomChange}
                       zoomListenersMap={zoomListenersMap}/>
            </div>
        </div>
    }

    return <div className={"chartPage"}>
        {renderNoData()}
        {renderDescriptionRow()}
        {renderDataRange()}
        {renderZoomControlChart(zoomChartConfig, data)}
        {renderChart("casesRecoveries", casesRecoveriesConfig, ["cases_daily", "recoveries_daily"], data)}
        {renderChart("casesCumulative", casesCumulativeConfig, ["cases_cumulative"], data)}
        {renderChart("recoveries", recoveriesConfig, ["recoveries_daily"], data)}
        {renderChart("deaths", deathsConfig, ["deaths_daily"], data)}
    </div>
}