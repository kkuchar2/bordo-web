import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selectAllCovid} from "redux/features/covidDataSlice.js";

import {getConfig} from "pages/config.jsx";
import {fetchAsyncGET} from "redux/api/api.js";

import * as echarts from "echarts";

import {getParentHeight, getParentWidth, useEffectInit, useEffectWithNonNull} from "util/Util.jsx";

import "styles/pages/ChartPage.scss"
import Text from "components/Text.jsx";

const mapData = data => data.map(d => {
    return {
        x: new Date(d.date),
        y: d.count
    }
});

export default () => {

    let chartInstance = null;

    const mount = useRef(null);
    const chartPageMount = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [todayCases, setTodayCases] = useState(0);
    const [todayDate, setTodayDate] = useState(0);
    const [increase, setIncrease] = useState(0);

    const config = getConfig([]);

    let data = useSelector(selectAllCovid)

    useEffect(() => {
        const renderChart = () => {
            const renderedInstance = echarts.getInstanceByDom(mount.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            }
            else {
                chartInstance = echarts.init(mount.current);
            }
        }

        renderChart()
    }, [config]);

    useEffectInit(() => {
        const updateSize = () => {
            setWidth(getParentWidth(chartPageMount))
            setHeight(getParentHeight(chartPageMount));
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        fetchAsyncGET("covid");
        return () => {
            window.removeEventListener('resize', updateSize);
            chartInstance && chartInstance.dispose();
        }
    }, [])

    useEffectWithNonNull(() => {
        chartInstance.showLoading({
            maskColor: 'rgba(24,24,24,0.8)',
            color: 'rgba(128,128,128,0.8)',
            fontSize: "40px",
            text: ' Loading',
            textColor: 'rgb(255,255,255)',
            showSpinner: true,
            spinnerRadius: 40,
            lineWidth: 8
        });
        chartInstance.setOption(getConfig(mapData(data)))
        chartInstance.hideLoading();

        const previous = data[data.length - 2].count;
        const today = data[data.length - 1].count;
        const inc = 100 * (today - previous) / previous;

        setTodayCases(today)
        setTodayDate(data[data.length - 1].date)
        setIncrease(Math.round((inc + Number.EPSILON) * 100) / 100)
    }, [data])

    useEffectWithNonNull(() => {
        chartInstance.setOption(getConfig(mapData(data)));
        chartInstance.resize();
    }, [width, height]);

    const getIncreaseText = () => {
        if (increase > 0) {
            return `+${increase}%`
        }
        else {
            return `${increase}%`
        }
    }

    return <div className={"chartPage"} ref={chartPageMount}>
        <div className={"latestTextWrapper"}>
            <Text className="latestCasesText" text={`New cases today: ${todayCases}`}>
                <div className={"percent"}>{getIncreaseText()}</div>
            </Text>
            <Text className="latestCasesDateText" text={todayDate}/>
        </div>
        <div className={"chartWrapper"} ref={chartPageMount}>
            <div className={"chart"} ref={mount}/>
        </div>
    </div>
}