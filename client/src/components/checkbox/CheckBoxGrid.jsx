import React, {Component} from "react";

import "./CheckBoxGrid.scss"
import Grid from "@material-ui/core/Grid";

class CheckBoxGrid extends Component {

    constructor(props) {
        super(props);

        this.renderColumns = this.renderColumns.bind(this);
        this.renderGrid = this.renderGrid.bind(this);
        this.calculateRowCount = this.calculateRowCount.bind(this);

        this.columnCount = 3;
    }

    componentDidMount() {
        this.calculateRowCount();
    }

    calculateRowCount() {

        this.rowCount = this.props.items.length / this.columnCount;
        let remainder = this.props.items.length - this.rowCount * this.columnCount;

        if (remainder > 0) {
            this.rowCount++;
        }

        console.log("Row count: " + this.rowCount);
    }

    renderColumns(row) {
        let elements = [];

        console.log("Column count: " + this.columnCount);

        console.log(this.props.items);

        for (let j = 0; j < this.columnCount; j++) {

            let item = this.props.items[j * row];

            elements.push(
                <Grid key={j} justify="center" alignItems="center" style={{padding: 0, margin: 0}} container>
                    <Grid item>
                        <div>{item}</div>
                    </Grid>
                </Grid>)
        }

        return elements;
    }

    renderGrid() {

        let grid = [];

        for(let i = 0; i < this.rowCount; i++) {
            grid.push(
                <Grid key={i} justify="center" alignItems="center" style={{padding: 0, margin: 0}} spacing={5} container>
                    <Grid item>
                        {this.renderColumns(i)}
                    </Grid>
                </Grid>
            );
        }

        {/*<Grid justify="center" alignItems="center" style={{padding: 0, margin: 0}} spacing={5} container>*/}
        {/*    <Grid item>*/}

        {/*        // row1*/}
        {/*        <Grid justify="center" alignItems="center" style={{padding: 0, margin: 0}} spacing={5} container>*/}
        {/*            <Grid item>*/}
        {/*                <CheckBox text={"QuickSort"}/>*/}
        {/*            </Grid>*/}
        {/*            <Grid item>*/}
        {/*                <CheckBox text={"BubbleSort"}/>*/}
        {/*            </Grid>*/}
        {/*            <Grid item>*/}
        {/*                <CheckBox text={"BubbleSort"}/>*/}
        {/*            </Grid>*/}
        {/*        </Grid>*/}

        {/*        // row2*/}
        {/*        <Grid justify="center" alignItems="center" style={{padding: 0, margin: 0}} spacing={5} container>*/}
        {/*            <Grid item>*/}
        {/*                <CheckBox text={"QuickSort"}/>*/}
        {/*            </Grid>*/}
        {/*            <Grid item>*/}
        {/*                <CheckBox text={"BubbleSort"}/>*/}
        {/*            </Grid>*/}
        {/*            <Grid item>*/}
        {/*                <CheckBox text={"BubbleSort"}/>*/}
        {/*            </Grid>*/}
        {/*        </Grid>*/}
        {/*    </Grid>*/}
        {/*</Grid>*/}

        return grid;
    }

    render() {
        return (
            this.renderGrid()
        )
    }
}

export default CheckBoxGrid;