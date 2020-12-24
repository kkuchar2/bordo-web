import {axisLabelX, axisLabelY, mapDates, splitLineStyle, zoomComponent} from "configs/chart/common";

export const casesCumulativeConfig = data => {
    let dates = mapDates(data);
    let values = data.map(d => d["cases_cumulative"]);

    return {

        grid: {
            top: '10',
            right: '20',
            left: '110',
        },
        tooltip: {
            trigger: 'axis',
            position: pt => [pt[0], '10%'],
            confine: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: dates,
            axisLabel: axisLabelX,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false,
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: true,
            splitLine: splitLineStyle,
            axisLabel: axisLabelY,
        },
        dataZoom: zoomComponent(data, false),
        series: [
            {
                name: 'All cases:',
                type: 'line',
                smooth: false,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgba(255,44,44,0.5)'
                },
                data: values,
                animation: true
            }
        ],
        animation: true
    };
}
