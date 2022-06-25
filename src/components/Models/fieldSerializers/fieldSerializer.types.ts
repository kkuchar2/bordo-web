import {ChangeEvent} from "react";

export interface FieldSerializerProps {
    name: string,
    value: any,
    inEditMode: boolean,
    onChange?: (e: ChangeEvent<any>) => void;
    isEditable: boolean
}