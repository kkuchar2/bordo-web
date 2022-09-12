import React, {useMemo} from 'react';

import {Box, Center, Grid, GridItem, Text} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {BackendModelInfo} from 'state/reducers/crud/modelSlice.types';
import {RootState} from 'state/store';

export const ModelList = () => {

    const models = useSelector<RootState, BackendModelInfo[]>((state: RootState) => state.model.modelTypes);

    console.log('Model types: ', models);

    const items = useMemo(() => {
        return models.map((model) => {
            return <GridItem w={'150px'} h={'150px'} bg={'rgba(255,255,255,0.07)'} key={model.model}>
                <Center w={'100%'} h={'100%'}>
                    <Text>{model.model}</Text>
                </Center>
            </GridItem>;
        });
    }, [models]);

    return <Box p={5}>
        <Grid templateColumns={'repeat(10, 1fr)'} gap={1}>
            {items}
        </Grid>
    </Box>;
};