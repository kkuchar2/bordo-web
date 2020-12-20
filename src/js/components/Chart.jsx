import React, {useEffect, useRef, useState} from 'react';

import * as echarts from "echarts";

import {getParentHeight, getParentWidth, useEffectInit, useEffectWithNonNull} from "util/util.js";

import "styles/components/Chart.scss"

export default props => {

    let chartInstance = null;
    const mount = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const config = props.configFunc([]);

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
            setWidth(getParentWidth(mount))
            setHeight(getParentHeight(mount));
        }
        window.addEventListener('resize', updateSize);
        updateSize();
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
        chartInstance.setOption(props.configFunc(props.mapData(props.data)))
        chartInstance.hideLoading();
    }, [props.data])

    useEffectWithNonNull(() => {
        chartInstance.setOption(props.configFunc(props.mapData(props.data)));
        chartInstance.resize();
    }, [width, height]);

    return <div className={"chart"} ref={mount}/>
}