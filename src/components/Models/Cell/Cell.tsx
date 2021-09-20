import React, {useCallback} from "react";

import {StyledCell} from "components/Models/TableRow/style";
import {Text} from "kuchkr-react-component-library";

export interface CellProps {
    name: string,
    colProps: any, // TODO
    inEditMode: boolean,
    value: any, // TODO,
    title: string,
    onChange: Function,
    isEditable: boolean,
    style?: any, // TODO
    titleWidth?: number
}

export const Cell = (props: CellProps) => {

    const {name, colProps, inEditMode, value, title, onChange, isEditable, style, titleWidth = 50} = props;

    const onCellValueChange = useCallback((v) => {
        onChange?.(name, v);
    }, [onChange]);

    const renderTitle = useCallback(() => {
        if (title) {
            return <Text style={{minWidth: titleWidth}} text={title}/>;
        }
    }, [title]);

    const Component = colProps.fieldToComponentSerializer;

    return <StyledCell style={style ? style : {minWidth: 0, width: colProps.width}}>
        {renderTitle()}
        <Component name={name} value={value} inEditMode={inEditMode} onChange={onCellValueChange} isEditable={isEditable}/>
    </StyledCell>;
};