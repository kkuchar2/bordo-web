import {StyledCell} from "components/Models/TableRow/style.js";
import {Text} from "kuchkr-react-component-library";
import React, {useCallback} from "react";

export const Cell = props => {

    const {name, colProps, inEditMode, value, title, onChange, isEditable, style, titleWidth = 50} = props;

    const onCellValueChange = useCallback((v) => {
        onChange?.(name, v);
    }, [onChange]);

    const renderTitle = useCallback(() => {
        if (title) {
            return <Text style={{minidth: titleWidth}} text={title}/>;
        }
    }, [title]);

    const Component = colProps.fieldToComponentSerializer;

    return <StyledCell style={style ? style : {minWidth: 0, width: colProps.width}}>
        {renderTitle()}
        <Component name={name} value={value} inEditMode={inEditMode} onChange={onCellValueChange} isEditable={isEditable}/>
    </StyledCell>;
};