import React, {useCallback, useRef} from "react";

import {TrashIcon} from "@heroicons/react/outline";
import {Dictionary} from "@reduxjs/toolkit";
import {useAppDispatch} from "appRedux/store";
import {Cell} from "components/Models/Cell/Cell";
import {getColumnProperties} from "components/Models/columnProperties";
import {Button, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {deleteButtonTheme, saveButtonTextTheme, saveButtonTheme, StyledCell, StyledTableRow} from "./style";

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

    const { row, model, fields, saveHandler, deleteHandler, onEditModeRequest, editedId } = props;

    const cellElements: Array<any> = [];

    const editedRowData = useRef<Dictionary<any>>({});

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const editMode = editedId === row.id;

    const onEditClick = useCallback(() => {

    }, [cellElements, row]);

    const onDeleteClick = useCallback(() => {
        deleteHandler?.(row.id, dispatch);
    }, [cellElements, row]);

    const onEditButtonClick = useCallback(() => {
        if (editMode) {
            onEditClick();
        }
        else {
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
                <div style={{ display: 'flex' }}>
                    <Text theme={saveButtonTextTheme} text={t("EDIT")}/>
                </div>
            </Button>
            <Button theme={deleteButtonTheme} onClick={onDeleteButtonClick}>
                <div style={{ display: 'flex' }}>
                    <TrashIcon className={`h-5 w-5 text-white`}/>
                </div>
            </Button>
        </StyledCell>;
    }, [editMode]);

    const onCellChange = useCallback((name, data) => {
        editedRowData.current = Object.assign({}, editedRowData.current, { [name]: data });
    }, [model]);

    const createCell = useCallback((type, name, value, idx) => {
        const colProps = getColumnProperties(type);
        return <Cell
            name={name}
            colProps={colProps}
            value={value}
            key={idx}
            onChange={onCellChange}
            title={''}/>;
    }, [fields, model, editMode]);

    const onKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            onEditClick();
        }
    }, []);

    const renderColumns = useCallback(() => {
        if (!row) {
            return;
        }

        // Cells related to data
        const tableComponentCells: Array<any> = [];

        // Additional cells, like action cells
        const additionalCells: Array<any> = [];

        const dataCells = Object.entries(row);

        // Generate data cells
        for (let j = 0; j < dataCells.length; j++) {
            const fieldInfo = fields[j];
            const [name, value] = dataCells[j];
            tableComponentCells.push(createCell(fieldInfo.type, name, value, j));
        }

        additionalCells.push(createActionsCell(dataCells.length));

        return tableComponentCells.concat(additionalCells);
    }, [row, model, fields, editMode]);

    return <StyledTableRow tabIndex={0} onClick={onRowClick} inEditMode={editMode} onKeyDown={onKeyDown}>
        {renderColumns()}
    </StyledTableRow>;
};

export default TableRow;