import React, {useRef, useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAllCovid} from "redux/features/covidDataSlice.js";

import {getConfig} from "pages/config.jsx";
import {fetchAsyncGET} from "redux/api/api.js";

import * as echarts from "echarts";

import {
    getParentHeight,
    getParentWidth,
    useEffectInit,
    useEffectWithNonNull
} from "util/Util.jsx";

import "styles/pages/ChartPage.scss"

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

    useEffectWithNonNull(() => chartInstance.setOption(getConfig(mapData(data))), [data])

    useEffectWithNonNull(() => {
        chartInstance.setOption(getConfig(mapData(data)));
        chartInstance.resize();
    }, [width, height]);

    return <div className={"chartPage"} ref={chartPageMount}>
        <div className={"chart"} ref={mount}/>
    </div>
}