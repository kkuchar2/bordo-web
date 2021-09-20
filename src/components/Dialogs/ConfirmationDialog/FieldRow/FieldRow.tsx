import React, {useCallback} from "react";

import {Text} from "kuchkr-react-component-library";

import {inputTheme, StyledFieldRow, titleTextTheme} from "./style";

export interface FieldRowProps {
    name: string,
    colProps: any, // TODO
    inEditMode: boolean,
    value: any, // TODO
    title: string,
    onChange: Function,
    isEditable: boolean
}

export const FieldRow = (props: FieldRowProps) => {

    const {name, colProps, inEditMode, value, title, onChange, isEditable} = props;

    const onCellValueChange = useCallback((v) => {
        onChange?.(name, v);
    }, [onChange]);

    const renderTitle = useCallback(() => {
        if (title) {
            return <Text theme={titleTextTheme} style={{minWidth: 250, width: 250, maxWidth: 300 }}
                         text={title}/>;
        }
    }, [title]);

    const Component = colProps.fieldToComponentSerializer;

    return <StyledFieldRow style={{marginTop: 20, display: 'flex', minWidth: 0, width: "100%", padding: 10}}>
        {renderTitle()}
        <Component name={name} value={value} inEditMode={inEditMode} onChange={onCellValueChange}
                   isEditable={isEditable} inputCustomTheme={inputTheme}/>
    </StyledFieldRow>;
};