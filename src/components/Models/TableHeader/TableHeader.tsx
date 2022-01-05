import React, {useCallback} from "react";

import {IFieldInfo} from "appRedux/reducers/api/crud";
import {getColumnProperties} from "components/Models/columnProperties";
import {Text} from "kuchkr-react-component-library";

import {humanize} from "../../../util";

import {headerTextTheme, StyledTableHeader} from "./style";

export interface TableHeaderProps {
    fields: Array<IFieldInfo>
}

const TableHeader = (props: TableHeaderProps) => {

    const {fields} = props;

    const renderFieldNames = useCallback(() => {
        if (!fields) {
            return;
        }
        return fields.map((field: IFieldInfo, idx: number) => {
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