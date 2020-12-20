export const getConfig = d => {
    let dates = d.map(d => [d.x.getFullYear(), d.x.getMonth() + 1, d.x.getDate()].join('/'));
    let values = d.map(d => d.y);

    return {

        grid: {
            top: '10',
            right: '20',
            left: '80',
        },
        tooltip: {
            trigger: 'axis',
            position: pt => [pt[0], '10%'],
            confine: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {show: false},
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'white'
                }
            }
            },
        dataZoom: [{
                start: 50,
                end: 100,
                handleIcon: 'M24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z',
                handleSize: '100%',
                backgroundColor: '#1c1c1c55',
                handleStyle: {
                    borderColor: '#ffffff00',
                    color: '#ffffffcc',
                    shadowBlur: 0,
                    realtime: true,
                    shadowColor: 'rgba(0, 0, 0, 0)'
                },
                textStyle: {
                    color: '#ffffff',
                    fontFamily: 'Rubik',
                    fontSize: 15,
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
                    color: 'rgba(255,255,255,0.7)'
                },
                areaStyle: {},
                data: values
            }
        ]
    };
}