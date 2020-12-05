import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selectAllCovid} from "redux/features/covidDataSlice.js";
import * as d3 from 'd3';

import {
    fetchAsyncGET
} from "redux/api/api.js";

import {
    getParentWidth,
    getParentHeight,
    useEffectInit,
    useEffectWithNonNull
} from "util/Util.jsx";

import {
    createLinearScaleX,
    createLinearScaleY,
    createArea,
    createLine,
    pointsFromData,
    addPathToSvg,
    addAreaToSvg,
    addAxisToSvg
} from "util/D3Util.jsx";

import "styles/pages/ChartPage.scss"

export default () => {

    const mount = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [svg, setSvg] = useState(0);
    const [casesDailyLine, setCasesDailyLine] = useState(0);
    const [casesTotalLine, setCasesTotalLine] = useState(0);
    const [casesDailyArea, setCasesDailyArea] = useState(0);
    const [casesTotalArea, setCasesTotalArea] = useState(0);

    let data = useSelector(selectAllCovid)

    const padding = 0;

    useEffectInit(() => {
        let w = getParentWidth(mount);
        let h = getParentHeight(mount);

        const updateSize = () => {
            setWidth(getParentWidth(mount))
            setHeight(getParentHeight(mount));
        }

        const initSvg = () => {
            setSvg(d3.select(mount.current)
                .append("svg")
                .attr("width", w)
                .attr("height", h))
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        initSvg();
        fetchAsyncGET("covid");
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    useEffectWithNonNull(() => {
        addPathToSvg(svg, "casesDailyLine", "green", 2);
        //addPathToSvg(svg, "casesTotalLine", "red", 5);
        addAreaToSvg(svg, "casesDailyArea", "#00FF0011");
        addAxisToSvg(svg, "axisX");
        addAxisToSvg(svg, "axisY");
    }, [svg])

    useEffectWithNonNull(() => {

        const parseTime = d3.timeParse("%Y-%m-%d");

        let targetData = [];

        data.forEach(function(d) {
            let elem = {
                date: parseTime(d.date),
                count: d.count
            }
            targetData.push(elem);
        });

        const x = d3.scaleTime().range([padding, width - padding]);
        x.domain(d3.extent(targetData, d => d.date));

        const y = d3.scaleLinear().range([height, 0]);
        y.domain([0, 40000])

        let casesDailyData = targetData.map(element => element.count);
        let casesDailyTotal =  casesDailyData.map((elem, index) =>
            casesDailyData.slice(0, index + 1).reduce((a, b) => a + b));

        let casesDailyPoints = pointsFromData(width, casesDailyData, 0);
        let casesTotalPoints = pointsFromData(width, casesDailyTotal, 0);

        d3.select("#casesDailyLine")
            .attr("d", casesDailyLine(casesDailyPoints))
            .attr("transform", "translate(" + width / 2 + "," + (-100) +")");

        d3.select("#casesTotalLine")
            .attr("d", casesTotalLine(casesTotalPoints))
            .attr("transform", "translate(" + width / 2 + "," + 0 +")");

        d3.select("#casesDailyArea")
            .attr("d", casesDailyArea(casesDailyPoints))
            .attr("transform", "translate(" + width / 2 + "," + (-100) +")");

        d3.select("#casesTotalArea")
            .attr("d", casesTotalArea(casesTotalPoints))
            .attr("transform", "translate(" + width / 2 + "," + 0 +")");

        d3.select("#axisX")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height - 100) + ")")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")).ticks(10))
            .selectAll("text")
            .style("text-anchor", "end")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "0.7em")
            .attr("transform", "rotate(-30)");

        d3.select("#axisY")
            .attr("class", "axis")
            .attr("transform", "translate(" + 100 + "," + (-100) +")")
            .call(d3.axisLeft(y).ticks(10))
            .selectAll("text")
            .style("text-anchor", "end")
            .style("text-anchor", "end")
            .attr("dx", "-.3em")
            .attr("dy", "-.55em")

    }, [casesDailyLine, casesTotalLine, casesDailyArea, casesTotalArea, data]);

    useEffectWithNonNull(() => {
        const scaleX1 = createLinearScaleX(width - padding * 2, padding, width - padding);
        const scaleX2 = createLinearScaleX(width - padding * 2, padding, width - padding);
        const scaleY1 = createLinearScaleY(height, 0, 40000);
        const scaleY2 = createLinearScaleY(height, 0, 500000);

        setCasesDailyLine(() => createLine(scaleX1, scaleY1));
        setCasesTotalLine(() => createLine(scaleX2, scaleY2));
        setCasesDailyArea(() => createArea(height, scaleX1, scaleY1));
        setCasesTotalArea(() => createArea(height, scaleX2, scaleY2));

        svg.attr("width", "100%").attr("height", "100%");
    }, [width, height, svg]);

    return <div className={"chartPage"}>
        <div className={"chart"} ref={mount}/>
    </div>
}