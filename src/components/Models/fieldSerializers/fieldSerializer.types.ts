export interface FieldSerializerProps {
    name: string,
    value: any,
    inEditMode: boolean,
    onChange: (s: string) => void,
    isEditable: boolean
}