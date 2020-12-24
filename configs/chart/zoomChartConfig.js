import {axisLabelY, mapDates, splitLineStyle, zoomComponent} from "configs/chart/common";

export const zoomChartConfig = data => {
    let dates = mapDates(data);

    return {

        grid: {
            top: '0',
            right: '20',
            left: '20',
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: dates,
            axisLabel: {
                show: false,
            },
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
        dataZoom: zoomComponent(data, true)
    };
}