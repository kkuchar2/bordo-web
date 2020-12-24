import {axisLabelX, axisLabelY, mapDates, splitLineStyle, zoomComponent} from "configs/chart/common";

export const recoveriesConfig = data => {
    let dates = mapDates(data);
    let values = data.map(d => d["recoveries_daily"]);

    return {

        grid: {
            top: '10',
            right: '20',
            left: '70',
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
        dataZoom: zoomComponent(data, false),
        series: [
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
                data: values,
                animation: true
            }
        ],
        animation: true
    };
}