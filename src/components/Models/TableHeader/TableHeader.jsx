import {columnProperties, getColumnProperties} from "components/Models/columnProperties.js";
import {headerTextTheme, StyledTableHeader} from "components/Models/TableHeader/style.js";
import {Text} from "kuchkr-react-component-library";
import React, {useCallback} from "react";

const TableHeader = (props) => {

    const {fields} = props;

    const renderFieldNames = useCallback(() => {
        if (!fields) {
            return;
        }
        return fields.map((field, idx) => {
            const colProps = getColumnProperties(field.type);
            return <Text theme={headerTextTheme} style={{minWidth: 0, width: colProps.width}} key={idx} text={field.name} />;
        });
    }, [fields]);

    return <StyledTableHeader>
        {renderFieldNames()}
        <Text theme={headerTextTheme} key={fields?.length} text={'Actions'} />
    </StyledTableHeader>;
};

export default TableHeader;