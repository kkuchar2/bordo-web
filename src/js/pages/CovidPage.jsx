import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {getAllStatistics} from "../redux/reducers/api/covidStatisticsSlice.js";
import {getAllCalculations} from "../redux/reducers/api/covidCalculationsSlice.js";

import { useEffectWithNonNull} from "util/util.js";

import Text from "components/Text";
import Chart from "components/Chart";

import {zoomChartConfig} from "configs/chart/zoomChartConfig";
import {casesRecoveriesConfig} from "configs/chart/casesRecoveriesConfig";
import {casesCumulativeConfig} from "configs/chart/casesCumulative";
import {recoveriesConfig} from "configs/chart/recoveriesConfig";
import {deathsConfig} from "configs/chart/deathsConfig";

import "styles/pages/ChartPage.scss";
import {mapDates} from "configs/chart/common";

const mapDate = data => data.map(entry => {
    return {x: new Date(entry.date)};
});

const mapDateFields = (data, fieldNames) => data.map(entry => {
    const mapped = {x: new Date(entry.date)};
    fieldNames.forEach(fieldName => mapped[fieldName] = entry[fieldName]);
    return mapped;
});

function ChartPage() {
    const [todayDate, setTodayDate] = useState(0);
    const [todayCases, setTodayCases] = useState(0);
    const [todayCases2] = useState(0);

    const [zoomListenersMap] = useState({});

    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(0);

    let statistics = useSelector(getAllStatistics);
    let calculations = useSelector(getAllCalculations);

    useEffect(() => {
        // Dispatch GET request to get covid data
    }, []);

    useEffectWithNonNull(() => {
        setTodayDate(statistics[statistics.length - 1].date);
        setTodayCases(statistics[statistics.length - 1].cases_daily);
        setRangeEnd(statistics.length - 1);
    }, [statistics]);

    const zoomCallbackProvider = (name, func) => zoomListenersMap[name] = func;

    const onZoomChange = zoom => {
        setRangeStart(zoom.startValue);
        setRangeEnd(zoom.endValue);
    };

    const renderNoData = () => {
        if (statistics.length > 0) {
            return;
        }
        return <div className={"emptyData"}>
            <div>Brak danych</div>
        </div>;
    };

    const renderChart = (name, configFunc, fields, data) => {
        if (data.length === 0) {
            return;
        }
        return <div className={"chartWrapper"}>
            <Chart className={"chart"} configFunc={configFunc}
                   name={name}
                   mapData={d => mapDateFields(d, fields)} data={data}
                   zoomCallbackProvider={zoomCallbackProvider}/>
        </div>;
    };

    const renderInfo = () => <div className={"latestTextWrapper"}>
        <Text className="latestCasesDateText" text={todayDate}/>
        <Text className="latestCasesText" text={`Liczba nowych przypadków: ${todayCases}`}/>
    </div>;

    const renderDescriptionRow = () => {
        if (statistics.length === 0) {
            return;
        }
        return <div className={"latestTextRow"}>
            <Text className="title" text={"Koronawirus w Polsce (SARS-CoV-2)"}/>
            {renderInfo()}
        </div>;
    };

    const renderDataRange = () => {
        if (statistics.length === 0) {
            return;
        }
        let dates = mapDates(mapDate(statistics));
        return <div className={"dataRangeTextRow"}>
            <Text className="dataRangeText" text={`${dates[rangeStart]} - ${dates[rangeEnd]}`}/>
        </div>;
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
        </div>;
    };

    return <div className={"chartPage"}>
        {renderNoData()}
        {renderDescriptionRow()}
        {renderDataRange()}
        {renderZoomControlChart(zoomChartConfig, statistics)}
        {renderChart("casesRecoveries", casesRecoveriesConfig, ["cases_daily", "recoveries_daily"], statistics)}
        {renderChart("casesCumulative", casesCumulativeConfig, ["cases_cumulative"], statistics)}
        {renderChart("recoveries", recoveriesConfig, ["recoveries_daily"], statistics)}
        {renderChart("deaths", deathsConfig, ["deaths_daily"], statistics)}
    </div>;
}

export default ChartPage;