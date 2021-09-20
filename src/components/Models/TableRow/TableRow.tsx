import React, { useCallback, useRef} from "react";

import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import {Dictionary} from "@reduxjs/toolkit";
import {selectorModelData} from "appRedux/reducers/api/crud";
import {Cell} from "components/Models/Cell/Cell";
import {getColumnProperties} from "components/Models/columnProperties";
import {Button, Text} from "kuchkr-react-component-library";
import {useDispatch, useSelector} from "react-redux";

import {saveButtonTextTheme, saveButtonTheme, StyledCell, StyledTableRow, deleteButtonTheme} from "./style";

export interface TableRowProps {
    row: any, // TODO
    model: string,
    fields: any, // TODO
    saveHandler: any // TODO
    deleteHandler: any,
    onEditModeRequest: (rowId: number) => void
    editedId: number
}

const TableRow = (props: TableRowProps) => {

    const {row, model, fields, saveHandler, deleteHandler, onEditModeRequest, editedId} = props;

    const cellElements: Array<any> = [];

    const editedRowData = useRef<Dictionary<any>>({});

    const modelDataSelector = useSelector(selectorModelData);

    const dispatch = useDispatch();

    const editMode = editedId === row.id;

    const onSaveClick = useCallback(() => {
        // Edited row data contains only edited fields - we have to have all of them sent to server
        const dataCells = Object.entries(row);

        // Merge with original data keeping changed fields
        for (let j = 0; j < dataCells.length; j++) {
            const [columnName, cellValue] = dataCells[j];
            if (!(columnName in editedRowData.current)) {
                editedRowData.current[columnName] = cellValue;
            }
        }
        saveHandler?.(editedRowData.current, dispatch);
    }, [cellElements, row]);

    const onDeleteClick = useCallback(() => {
        deleteHandler?.(row.id, dispatch);
    }, [cellElements, row]);

    const onEditButtonClick = useCallback(() => {
        if (editMode) {
            onSaveClick();
        } else {
            onEditModeRequest(row.id);
        }
    }, [editMode]);

    const onDeleteButtonClick = useCallback(() => {
        if (editMode) {
            onDeleteClick();
        }
    }, [editMode]);

    const onRowClick = useCallback(() => {
        if (!editMode) {
            onEditModeRequest(row.id);
        }
    }, [editMode, row]);

    const createActionsCell = useCallback((idx) => {
        if (!editMode) {
            return;
        }

        return <StyledCell key={idx}>
            <Button theme={saveButtonTheme} onClick={onEditButtonClick}>
                <div style={{display: 'flex'}}>
                    <Text theme={saveButtonTextTheme} text={"Save"} />
                    <CheckIcon fontSize={'small'} style={{ marginLeft: 5, color: '#ffffff'}}/>
                </div>
            </Button>
            <Button theme={deleteButtonTheme} onClick={onDeleteButtonClick}>
                <div style={{display: 'flex'}}>
                    <DeleteIcon fontSize={'small'} style={{ color: '#ffffff'}}/>
                </div>
            </Button>
        </StyledCell>;
    }, [editMode]);

    const onCellChange = useCallback((name, data) => {
        editedRowData.current = Object.assign({}, editedRowData.current,  { [name] : data });
    }, [model]);

    const createCell = useCallback((type, name, value, isEditable, idx) => {
        const colProps = getColumnProperties(type);
        return <Cell
            name={name}
            colProps={colProps}
            value={value}
            inEditMode={editMode}
            key={idx}
            onChange={onCellChange}
            isEditable={isEditable}
            title={''}/>;
    }, [fields, model, editMode]);

    const onKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            onSaveClick();
        }
    }, []);

    const renderColumns = useCallback(() => {
        if (!row) {
            return;
        }

        // Cells related to data
        const tableComponentCells : Array<any> = [];

        // Additional cells, like action cells
        const additionalCells : Array<any> = [];

        const dataCells = Object.entries(row);

        // Generate data cells
        for (let j = 0; j < dataCells.length; j++) {
            const fieldInfo = fields[j];
            const [name, value] = dataCells[j];
            tableComponentCells.push(createCell(fieldInfo.type, name, value, fieldInfo.isEditable, j));
        }

        additionalCells.push(createActionsCell(dataCells.length));

        return tableComponentCells.concat(additionalCells);
    }, [row, model, fields, editMode]);

    return <StyledTableRow tabIndex={0} onClick={onRowClick} inEditMode={editMode} onKeyDown={onKeyDown}>
        {renderColumns()}
    </StyledTableRow>;
};

export default TableRow;