import React, {useCallback, useEffect, useMemo} from 'react';

import {Box, Button, HStack, Text, VStack} from '@chakra-ui/react';
import {showAddTableItemDialog} from 'components/DialogSystem/readyDialogs';
import Table from 'components/Table/Table';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {changeCurrentViewedModel} from 'state/reducers/application/appSlice';
import {BackendModelInfo, BackendTablesData} from 'state/reducers/crud/modelSlice.types';
import {getAllModelData, getMultiRowModelData, listModels} from 'state/services/modelService';
import {RootState, useAppDispatch} from 'state/store';
import {RequestStatus} from 'tools/client/client.types';

import {isSuccess, isWaiting} from '../api/api_util';

const { Select } = require('chakra-react-select');

const TableAdministration = () => {

    const currentModel = useSelector((state: RootState) => state.app.currentModel);
    const currentModelName = currentModel.model;
    const currentModelPackage = currentModel.package;
    const currentModelFullName = currentModel.fullModelName;

    const dispatch = useAppDispatch();

    const modelListRequestState = useSelector((state: RootState) => state.model.requests.getModelTypes);
    const modelDataRequestState = useSelector((state: RootState) => state.model.requests.getModelData);
    const addRowRequestState = useSelector((state: RootState) => state.model.requests.addRow);

    const models = useSelector<RootState, BackendModelInfo[]>((state: RootState) => state.model.modelTypes);
    const modelsData = useSelector<RootState, BackendTablesData>((state: RootState) => state.model.modelsData);

    const tableData = !currentModelFullName ? null : modelsData[currentModelFullName];
    const fields = tableData ? tableData.headers : null;
    const rows = tableData ? tableData.rows : null;

    console.log('Model types: ', models);
    console.log('Models data: ', modelsData);

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(listModels());
    }, []);

    useEffect(() => {
        if (!currentModelPackage || !currentModelName) {
            return;
        }
        dispatch(getAllModelData(currentModelPackage, currentModelName));
    }, [currentModelName, currentModelPackage]);

    useEffect(() => {
        if (models.length === 0) {
            return;
        }

        if (!currentModelPackage || !currentModelName) {
            const firstModel = models[0];
            dispatch(changeCurrentViewedModel(firstModel.model, firstModel.package));
        }
    }, [models]);

    useEffect(() => {
        if (isSuccess(modelDataRequestState)) {

            if (modelsData.updateInfo) {
                const ids = modelsData.updateInfo['updated_ids'];
                dispatch(getMultiRowModelData(currentModelPackage, currentModelName, ids));
            }
        }
    }, [modelsData, modelDataRequestState]);

    useEffect(() => {
        if (addRowRequestState.info.status === RequestStatus.Success) {
            dispatch(getAllModelData(currentModelPackage, currentModelName));
        }
    }, [addRowRequestState]);

    const onSelected = useCallback((selectedOption) => {
        if (!selectedOption) {
            return;
        }

        const value = models[selectedOption.value];

        if (!value) {
            return;
        }
        dispatch(changeCurrentViewedModel(value.model, value.package));
    }, [models]);

    const onAddNewItemClick = useCallback(() => {
        showAddTableItemDialog({}, fields, currentModelPackage, currentModelName);
    }, [fields, currentModelName, currentModelPackage]);

    // const modelListForSelect: OptionsType<any> = Object.keys(modelList).length === 0 ? [] : modelList.map((x: any) => {
    //     return {value: x, label: x.model};
    // });

    const toolbar = useMemo(() => {
        const pending = isWaiting(modelListRequestState);

        if (pending) {
            return <Box>
                {pending ?
                    <progress className={'progress w-full bg-gray-600 h-[20px] progress-accent'}></progress> : null}
            </Box>;
        }

        const options = models.map((v: BackendModelInfo, idx: number) => {
            return { value: idx, label: `${v.package}.${v.model}` };
        });

        return <HStack p={3} bg={'whiteAlpha.200'}>
            <Box w={400}>
                <Select options={options}
                        onChange={onSelected}/>
            </Box>
            <Button className={'add_button'} onClick={onAddNewItemClick}>
                <Text>{t('ADD_NEW_ROW')}</Text>
            </Button>
        </HStack>;
    }, [modelListRequestState, currentModelName, modelsData]);

    return <VStack p={3} align={'stretch'}>
        {toolbar}
        <Table fields={fields} model={currentModelName} modelPackage={currentModelPackage} rows={rows}/>
    </VStack>;
};

/*
  <Select value={selectedAlgorithm}
                        bg={'#3e3e3e'}
                        focusBorderColor={'white.500'}
                        isSearchable={false}
                        selectedOptionColor={'green'}
                        onChange={setSelectedAlgorithm}
                        alignSelf={'flex-start'}
                        useBasicStyles={true}
                        options={sortingAlgorithms}
                        isDisabled={sorting}>
                </Select>
 */

export default TableAdministration;