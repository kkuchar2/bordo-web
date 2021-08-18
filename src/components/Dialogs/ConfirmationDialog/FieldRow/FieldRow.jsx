import {StyledFieldRow, titleTextTheme} from "components/Dialogs/ConfirmationDialog/FieldRow/style.js";
import {Text} from "kuchkr-react-component-library";
import React, {useCallback} from "react";

const inputTheme = {
    backgroundColor: "#f5f5f5",
    textColor: "#2f2f2f",
    placeholderTextColor: "#c5c5c5",
    border: "none",
    borderFocus: "none",
    borderRadius: "6px",
    height: "40px",
    width: "250px",
    padding: "10px",
    fontSize: '1em',

    textTheme: {
        textColor: '#545454',
        fontSize: '1em'
    }
};

export const FieldRow = props => {

    const {name, colProps, inEditMode, value, title, onChange, isEditable} = props;

    const onCellValueChange = useCallback((v) => {
        onChange?.(name, v);
    }, [onChange]);

    const renderTitle = useCallback(() => {
        if (title) {
            return <Text theme={titleTextTheme} style={{minWidth: 60, width: 100, maxWidth: 250, marginRight: 20}} text={title}/>;
        }
    }, [title]);

    const Component = colProps.fieldToComponentSerializer;

    return <StyledFieldRow style={{display: 'flex', minWidth: 0, width: "100%", padding: 10}}>
        {renderTitle()}
        <Component name={name} value={value} inEditMode={inEditMode} onChange={onCellValueChange} isEditable={isEditable} inputCustomTheme={inputTheme} />
    </StyledFieldRow>;
};