import React, {useCallback, useEffect, useState} from "react";

import {tryUpdateModelData} from "appRedux/reducers/api/crud";
import TableHeader from "components/Models/TableHeader/TableHeader";
import TableRow from "components/Models/TableRow/TableRow";
import {useDispatch} from "react-redux";

import {StyledTable, StyledTableRows} from "./style";

export interface TableProps {
    fields: any, // TODO
    rows: any, // TODO
    model: string,
    modelPackage: string
}

const Table = (props: TableProps) => {

    const {fields, rows, model, modelPackage} = props;

    const dispatch = useDispatch();

    const [editedId, setEditedId] = useState(-1);

    useEffect(() => {
        setEditedId(-1);
    }, [model, modelPackage]);

    const onRowSave = useCallback((data) => {
        setEditedId(-1);
        dispatch(tryUpdateModelData(modelPackage, model, data));
    }, [modelPackage, model]);

    const editModeRequest = useCallback((rowId) => {
        setEditedId(rowId);
    }, [editedId]);

    const renderRows = useCallback(() => {

        if (!rows) {
            return;
        }

        return Object.entries(rows).map((row, idx) => {
            const [, value] = row;
            return <TableRow key={idx + model} model={model} row={value} fields={fields} saveHandler={onRowSave}
                             onEditModeRequest={editModeRequest} editedId={editedId}/>;
        });
    }, [rows, fields, model, fields, onRowSave, editedId]);

    return <StyledTable>
        <TableHeader fields={fields}/>
        <StyledTableRows>
            {renderRows()}
        </StyledTableRows>
    </StyledTable>;
};

export default Table;