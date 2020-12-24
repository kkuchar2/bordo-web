import {axisLabelX, axisLabelY, mapDates, splitLineStyle, zoomComponent} from "configs/chart/common";

export const casesRecoveriesConfig = data => {
    let dates = mapDates(data);
    let values1 = data.map(d => d["cases_daily"]);
    let values2 = data.map(d => d["recoveries_daily"]);

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
            axisLabel: axisLabelY
        },
        series: [
            {
                name: 'Cases:',
                type: 'bar',
                smooth: false,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgba(255,44,44,0.7)',
                    barBorderRadius: [0, 0, 0, 0]
                },
                stack: 'one',
                areaStyle: {},
                data: values1,
                animation: true
            },
            {
                name: 'Recoveries:',
                type: 'bar',
                smooth: false,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#28a745',
                    barBorderRadius: [5, 5, 0, 0]
                },
                stack: 'one',
                areaStyle: {},
                data: values2,
                animation: true
            },
        ],
        animation: true,
        dataZoom: zoomComponent(data, false)
    };
}
