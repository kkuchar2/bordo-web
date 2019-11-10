import React, {Component} from "react";

import Plot from 'react-plotly.js';

import "./MyChart.scss"

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MyChart extends Component {

    constructor(props) {
        super(props);

        let worker = new Worker('./../../workers/slow_fib.worker', { type: 'module' });

        worker.onmessage = (e) => {

            if (e.data !== '') {
                let data = e.data;
                //console.log("[DATA] Received data: " + data);

                this.state.y = data;
                this.state.dirty = true;
            }

        };

        this.state = {
            initializing: true,
            dirty: false,
            x: [],
            y: [],
            samples: 3000,
            sortWorker: worker
        };
        this.sort = this.sort.bind(this);
        this.initData = this.initData.bind(this);
    }

    componentDidMount() {
        this.initData();
    }

    componentDidUpdate() {
        if (this.state.initializing) {
            this.setState({initializing: false});
            setInterval(() => {
                if (this.state.dirty) {
                    this.forceUpdate();
                    this.state.dirty = false;
                }
            }, 16);
            this.sort();
        }
    }

    initData() {
        let values = [];
        let indices = [];

        for (let i = 0; i < this.state.samples; i++) {
            indices.push(i);
            values.push(getRandomInt(1, 1000));
        }

        this.setState({x: indices});
        this.setState({y: values});
    }

    sort() {
        this.state.sortWorker.postMessage([new Uint8Array(this.state.y)]);
    }

    render() {
        return (
            <div>
                <div className={"chart"}>
                    <Plot
                        data={[
                            {
                                x: this.state.x,
                                y: this.state.y,
                                type: 'bar',
                                marker: {color: 'green'},
                            }
                        ]}
                        layout={ {width: 1200, height: 800} }
                    />
                </div>
            </div>
        )
    }
}

export default MyChart;