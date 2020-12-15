// import * as d3 from "d3";
//
// export const createLinearScaleX = (width, left, right) => d3.scaleLinear().domain([left, right]).range([0, width]);
// export const createLinearScaleY = (height, bottom, top) => d3.scaleLinear().domain([bottom, top]).range([height, 0]);
// export const createArea = (y0, scaleX, scaleY) => d3.area().y0(y0).x(d => scaleX(d.x)).y1(d => scaleY(d.y));
// export const createLine = (scaleX, scaleY) => d3.line().x(d => scaleX(d.x)).y(d => scaleY(d.y));
// export const createAxisX = x => d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d"))
//
// export const pointsFromData = (width = 0, data= [], startPos = 0) => {
//     const points = [];
//     let samples = data.length;
//     let step = width / samples;
//
//     for (let sample = 0; sample < samples; sample++) {
//         points.push({x: startPos + sample * step - width / 2, y: data[sample]});
//     }
//
//     return points;
// }
//
// export const addAxisToSvg = (svg, name) => {
//     svg.append("g")
//         .attr("id", name)
//         .attr("class", name)
//         .attr("stroke", "#FFFFFF22")
//         .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//         .attr("transform", "rotate(-65)");
// }
//
// export const addAreaToSvg = (svg, name, color) => {
//     svg.append("path")
//         .attr("id", name)
//         .attr("class", [name, "area"].join(" "))
//         .attr("stroke", "none")
//         .style("fill", color)
// };
//
// export const addPathToSvg = (svg, name, color, strokeWidth) => {
//     svg.append("path")
//         .attr("id", name)
//         .attr("class", [name, "line"].join(" "))
//         .attr("stroke", color)
//         .attr("stroke-width", strokeWidth)
//         .attr("fill", "none");
// };