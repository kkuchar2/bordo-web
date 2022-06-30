import React, {useCallback, useEffect} from "react";

import {PlusIcon} from "@heroicons/react/outline";
import {
    getAddRowRequestState,
    getModelDataRequestState,
    getModelsData,
    getModelTypes,
    getModelTypesRequestState
} from "appRedux/reducers/api/crud/modelSlice";
import {ModelType} from "appRedux/reducers/api/crud/modelSlice.types";
import {changeCurrentViewedModel, selectorCurrentViewedModel} from "appRedux/reducers/application";
import {getAllModelData, getMultiRowModelData, listModels} from "appRedux/services/modelService";
import {useAppDispatch} from "appRedux/store";
import {showAddTableItemDialog} from "components/DialogSystem/readyDialogs";
import Table from "components/Models/Table/Table";
import {Select} from "components/Select/Select";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, isWaiting} from "../../api/api_util";

import {StyledModelsView, StyledToolbar, } from "./style";

const ModelsView = () => {

    const currentModel = useSelector(selectorCurrentViewedModel);
    const currentModelName = currentModel.model;
    const currentModelPackage = currentModel.package;
    const currentModelFullName = currentModel.fullModelName;

    const dispatch = useAppDispatch();

    const modelListRequestState = useSelector(getModelTypesRequestState);
    const modelDataRequestState = useSelector(getModelDataRequestState);
    const addRowRequestState = useSelector(getAddRowRequestState);

    const modelTypes = useSelector(getModelTypes);
    const modelsData = useSelector(getModelsData);
    const addItemToTableSelector = useSelector(getAddRowRequestState);

    const tableData = !currentModelFullName ? null : modelsData[currentModelFullName];
    const fields = tableData ? tableData.headers : null;
    const rows = tableData ? tableData.rows : null;

    const { t } = useTranslation();

    // TODO: detect if is mobile
    const isMobile = false;

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
        if (modelTypes.length === 0) {
            return;
        }

        if (!currentModelPackage || !currentModelName) {
            const firstModel = modelTypes[0];
            dispatch(changeCurrentViewedModel(firstModel.model, firstModel.package));
        }
    }, [modelTypes]);

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

        const value = modelTypes[selectedOption.value];

        if (!value) {
            return;
        }
        dispatch(changeCurrentViewedModel(value.model, value.package));
    }, [modelTypes]);

    const renderTable = useCallback(() => {
        return <Table fields={fields} model={currentModelName} modelPackage={currentModelPackage} rows={rows}/>;
    }, [fields, currentModelName, currentModelPackage, rows]);

    const onAddNewItemClick = useCallback(() => {
        showAddTableItemDialog({}, fields, currentModelPackage, currentModelName);
    }, [fields, currentModelName, currentModelPackage]);

    // const modelListForSelect: OptionsType<any> = Object.keys(modelList).length === 0 ? [] : modelList.map((x: any) => {
    //     return {value: x, label: x.model};
    // });

    const renderToolbar = useCallback(() => {
        const pending = isWaiting(modelListRequestState);

        if (pending) {
            return <div style={{ marginTop: 100 }}>
                {pending ?
                    <progress className="progress w-full bg-gray-600 h-[20px] progress-accent"></progress> : null}
            </div>;
        }

        const options = modelTypes.map((v: ModelType, idx: number) => {
            return { value: idx, name: `${v.package}.${v.model}` };
        });

        console.log(options);

        return <StyledToolbar>
            <Select items={options} onChange={onSelected}/>
            <button className={'add_button'} onClick={onAddNewItemClick}>
                <PlusIcon className={`h-5 w-5 text-white`}/>
                <p className={'h-[100%] text-white text-[12px] font-semibold'}>
                    {t('ADD_NEW_ROW')}
                </p>
            </button>
        </StyledToolbar>;
    }, [modelListRequestState, currentModelName, modelsData, isMobile]);

    return <StyledModelsView>
        {renderToolbar()}
        {renderTable()}
    </StyledModelsView>;
};

export default ModelsView;