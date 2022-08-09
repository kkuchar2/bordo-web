import {humanize} from 'util/util';

import React, {useCallback} from 'react';

import {Text} from '@chakra-ui/react';
import {getColumnProperties} from 'components/Models/columnProperties';
import {BackendTableColumn} from 'state/reducers/crud/modelSlice.types';

import {StyledTableHeader} from './style';

export interface TableHeaderProps {
    fields: Array<BackendTableColumn>
}

const TableHeader = (props: TableHeaderProps) => {

    const { fields } = props;

    const renderFieldNames = useCallback(() => {
        if (!fields) {
            return;
        }
        return fields.map((field: BackendTableColumn, idx: number) => {
            const colProps = getColumnProperties(field.type);
            return <div style={{
                height: '100%',
                width: colProps.width,
                maxWidth: colProps.width,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft: 20
            }} key={idx}>
                <Text>{humanize(field.name.toUpperCase())}</Text>
            </div>;
        });
    }, [fields]);

    return <StyledTableHeader>
        {renderFieldNames()}
    </StyledTableHeader>;
};

export default TableHeader;