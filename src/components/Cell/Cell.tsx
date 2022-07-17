import React, {useCallback} from "react";

import {StyledCell} from "components/TableRow/style";
import {Text} from "kuchkr-react-component-library";

export interface CellProps {
    name: string,
    colProps: any, // TODO
    value: any, // TODO,
    title: string,
    onChange: Function,
    style?: any, // TODO
    titleWidth?: number
}

export const Cell = (props: CellProps) => {

    const { name, colProps, value, title, onChange, style, titleWidth = 50 } = props;

    const onCellValueChange = useCallback((v) => {
        onChange?.(name, v);
    }, [onChange]);

    const renderTitle = useCallback(() => {
        if (title) {
            return <Text style={{ minWidth: titleWidth }} text={title}/>;
        }
    }, [title]);

    const Component = colProps.fieldToComponentSerializer;

    return <StyledCell style={style ? style : { minWidth: 0, width: colProps.width }}>
        {renderTitle()}
        <Component name={name} value={value} onChange={onCellValueChange}/>
    </StyledCell>;
};