import {humanize} from "util/util";

import React, {useCallback} from "react";

import {getColumnProperties} from "components/Models/columnProperties";
import {Text} from "kuchkr-react-component-library";
import {ColumnHeader} from "state/reducers/crud/modelSlice.types";

import {headerTextTheme, StyledTableHeader} from "./style";

export interface TableHeaderProps {
    fields: Array<ColumnHeader>
}

const TableHeader = (props: TableHeaderProps) => {

    const { fields } = props;

    const renderFieldNames = useCallback(() => {
        if (!fields) {
            return;
        }
        return fields.map((field: ColumnHeader, idx: number) => {
            const colProps = getColumnProperties(field.type);
            return <div style={{
                height: "100%",
                width: colProps.width,
                maxWidth: colProps.width,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft: 20
            }} key={idx}>
                <Text theme={headerTextTheme} text={humanize(field.name.toUpperCase())}/>
            </div>;
        });
    }, [fields]);

    return <StyledTableHeader>
        {renderFieldNames()}
    </StyledTableHeader>;
};

export default TableHeader;