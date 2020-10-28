import React, {Component} from 'react';
import Chart from "components/chart/Chart.jsx";

import "./Covid19Page.scss"

class Covid19Page extends Component {

    state = {
        windowWidth: 0,
        windowHeight: 0,
        data: [1, 2, 3, 4, 5, 6],
        dirty: false,
    };

    updateDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
        setInterval(this.refreshState, 16);

        let targetData = [];

        for (let i = 0; i < 1000; i++) {
            targetData.push(i);
        }

        this.setState({data: targetData});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    refreshState = () => {
        if (this.state.dirty) {
            this.state.dirty = false;
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className={"pageComponents"}>
                <Chart data={this.state.data}/>
            </div>);
    }
}

export default Covid19Page;
