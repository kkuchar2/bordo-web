import React, {useCallback, useReducer, useState} from 'react';

import {Box, Flex, Table as ChakraTable, Tbody, Td, Text, Thead, Tr} from '@chakra-ui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    Header,
    HeaderGroup,
    Row,
    useReactTable,
} from '@tanstack/react-table';

export interface TableProps {
    fields: any, // TODO
    rows: any, // TODO
    model: string,
    modelPackage: string
}

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
];

const columnHelper = createColumnHelper<Person>();

interface CustomHeaderProps {
    children: React.ReactNode;
}

const CustomHeader = (props: CustomHeaderProps) => {

    const { children } = props;

    return <Flex minW={{ base: '50px', sm: '100px', md: '150px' }} justify={'flex-start'} align={'center'}
                 bg={'rgba(255,255,255,0.07)'} pt={2} pb={2} pl={2}>
        <Text fontSize={'xl'}>{children}</Text>
    </Flex>;
};

const CustomCell = (props: CustomHeaderProps) => {

    const { children } = props;

    return <Flex bg={'rgba(0,0,0,0.04)'} justify={'flex-start'} align={'center'} pt={3} pb={3} pl={2}>
        <Text fontSize={'md'}>{children}</Text>
    </Flex>;
};

const columns = [
    columnHelper.accessor('firstName', {
        header: () => <CustomHeader>{'First Name'}</CustomHeader>,
        cell: info => <CustomCell>{info.getValue()}</CustomCell>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        header: () => <CustomHeader>{'Last Name'}</CustomHeader>,
        cell: info => <CustomCell>{info.getValue()}</CustomCell>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => <CustomHeader>{'Age'}</CustomHeader>,
        cell: info => <CustomCell>{info.getValue()}</CustomCell>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('visits', {
        header: () => <CustomHeader>{'Visits'}</CustomHeader>,
        cell: info => <CustomCell>{info.getValue()}</CustomCell>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
        header: () => <CustomHeader>{'Status'}</CustomHeader>,
        cell: info => <CustomCell>{info.getValue()}</CustomCell>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: () => <CustomHeader>{'Profile Progress'}</CustomHeader>,
        cell: info => <CustomCell>{info.getValue()}</CustomCell>,
        footer: info => info.column.id,
    }),
];

const Table = (props: TableProps) => {

    const [data, setData] = useState(() => [...defaultData]);
    const rerender = useReducer(() => ({}), {})[1];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const renderHeader = useCallback((header: Header<Person, unknown>) => {
        return <th key={header.id}>
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </th>;
    }, []);

    const renderHeaderGroup = useCallback((headerGroup: HeaderGroup<Person>) => {
        return <Tr key={headerGroup.id}>
            {headerGroup.headers.map(renderHeader)}
        </Tr>;
    }, []);

    const renderRow = useCallback((row: Row<Person>) => {
        return <Tr key={row.id}>
            {row.getVisibleCells().map(cell => {
                return <Td padding={0} border={'none'} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>;
            })}
        </Tr>;
    }, []);

    return <Box w={'100%'} overflowX={'auto'}>
        <ChakraTable>
            <Thead>
                {table.getHeaderGroups().map(renderHeaderGroup)}
            </Thead>
            <Tbody>
                {table.getRowModel().rows.map(renderRow)}
            </Tbody>
        </ChakraTable>
    </Box>;
};

export default Table;