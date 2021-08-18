import {tryUpdateModelData} from "appRedux/reducers/api/crud";
import {animatedWindowProps3} from "components/FormComponents/animation.js";
import {StyledTable, StyledTableRows} from "components/Models/Table/style.js";
import TableHeader from "components/Models/TableHeader/TableHeader.jsx";
import TableRow from "components/Models/TableRow/TableRow.jsx";
import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";

const Table = (props) => {

    const {fields, rows, model, modelPackage} = props;

    const dispatch = useDispatch();

    const onRowSave = useCallback((data) => {
        dispatch(tryUpdateModelData(modelPackage, model, data));
    }, [modelPackage, model]);

    const renderRows = useCallback(() => {
        if (!rows) {
            return;
        }

        return Object.entries(rows).map((row, idx) => {
            const [, value] = row;
            return <TableRow key={idx} model={model} row={value} fields={fields} saveHandler={onRowSave}/>;
        });
    }, [rows, fields]);

    return <StyledTable {...animatedWindowProps3}>
        <TableHeader fields={fields}/>
        <StyledTableRows>
            {renderRows()}
        </StyledTableRows>
    </StyledTable>;
};

export default Table;