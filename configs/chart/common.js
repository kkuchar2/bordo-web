export const splitLineStyle = {
    lineStyle: {
        color: 'rgba(112,112,112,0.0)'
    }
};
export const axisLabelX = {
    show: true,
    padding: [23, 0, 0, 0],
    textStyle: {
        color: 'white',
        fontFamily: 'Whitney Medium',
        fontSize: 14
    },
    position: "top"
};
export const axisLabelY = {
    show: true,
    textStyle: {
        color: 'white',
        fontFamily: 'Whitney Medium',
        fontSize: 15,
    }
};

export const useZoom = true;

export const zoomComponent = (data, visible) => data.length === 0 || !useZoom ? [] : [{
    borderColor: "transparent",
    backgroundColor: "#ffffff11",
    dataBackground: {
      lineStyle: {
         color: "red"
      }
    },
    start: 0,
    end: 100,
    handleIcon: 'M24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z',
    handleSize: '100%',
    handleStyle: {
        borderColor: '#ffffff00',
        color: '#ffffff',
        shadowBlur: 0,
        realtime: true,
        shadowColor: 'rgba(0, 0, 0, 0)'
    },
    show: visible,
    textStyle: {
        color: '#ffffff00',
        fontFamily: 'Whitney Medium',
        fontSize: 15,
    }
}];

export const mapDates = data => data.map(d => [d.x.getFullYear(), d.x.getMonth() + 1, d.x.getDate()].join('/'));