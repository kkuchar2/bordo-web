export const getConfig = d => {
    let dates = d.map(d => [d.x.getFullYear(), d.x.getMonth() + 1, d.x.getDate()].join('/'));
    let values = d.map(d => d.y);

    return {
        grid: {
            top: '50',
            right: '20',
            bottom: '70',
            left: '50',
        },
        tooltip: {
            trigger: 'axis',
            position: pt => [pt[0], '10%'],
            confine: true
        },
        title: {
            left: 'center',
            text: 'Covid cases in Poland',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                }
            }
        },
        dataZoom: [{
            type: 'inside',
            start: 50,
            end: 100
        }, {
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name: 'Covid cases in Poland:',
                type: 'line',
                smooth: false,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgba(56,125,255, 0.5)'
                },
                areaStyle: {
                },
                data: values
            }
        ]
    };
}