import React, {useEffect, useRef, useState} from 'react';

import * as echarts from "echarts";

import {getParentHeight, getParentWidth, useEffectInit, useEffectWithNonNull} from "util/util.js";

import "styles/components/Chart.scss"

let listener = false;

export default props => {

    let chartInstance = null;
    const mount = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [zoom, setZoom] = useState(0);

    const config = props.configFunc([]);

    const updateComponentZoom = () => {
        chartInstance.dispatchAction({
            type: 'dataZoom',
            dataZoomIndex: 0,
            startValue: zoom.startValue,
            endValue: zoom.endValue
        });
    }

    useEffectInit(() => {
        const updateSize = () => {
            setWidth(getParentWidth(mount))
            setHeight(getParentHeight(mount));
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        if (props.zoomCallbackProvider !== undefined && props.name !== undefined) {
            props.zoomCallbackProvider(props.name, setZoom);
        }
        return () => {
            window.removeEventListener('resize', updateSize);
            chartInstance && chartInstance.dispose();
        }
    }, [])

    useEffectWithNonNull(() => {
        const renderChart = () => {
            const renderedInstance = echarts.getInstanceByDom(mount.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            }
            else {
                chartInstance = echarts.init(mount.current);
            }

            if (!listener) {
                listener = true;
                chartInstance.on('datazoom', () => {
                    let zoom = chartInstance.getOption().dataZoom[0]
                    props.onZoomChange(zoom);
                    for (const [, listener] of Object.entries(props.zoomListenersMap)) {
                        listener(zoom)
                    }
                });
            }
        }
        renderChart()
    }, [config]);

    useEffectWithNonNull(updateComponentZoom, [zoom])

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

    useEffectWithNonNull(() => chartInstance.resize(), [width, height]);

    return <div className={"chart"} ref={mount}/>
}