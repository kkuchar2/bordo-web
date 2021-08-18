import {useMediaQuery} from "@material-ui/core";
import {
    getAllModelData,
    getSingleRowModelData,
    selectorModelData,
    selectorModelList,
    selectorUpdateModelData,
    tryGetListOfModels
} from "appRedux/reducers/api/crud";
import {changeCurrentViewedModel, selectorCurrentViewedModel, showDialog} from "appRedux/reducers/application";
import CreateNewModelItemDialog from "components/Dialogs/CreateNewModelItemDialog/CreateNewModelItemDialog.jsx";

import {animatedWindowProps3} from "components/FormComponents/animation.js";
import {spinnerTheme} from "components/FormComponents/commonStyles.js";
import Table from "components/Models/Table/Table.jsx";
import {Button, Select, Spinner} from "kuchkr-react-component-library";
import _ from "lodash";

import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemButtonTheme, modelSelectorTheme, StyledModelsView, StyledToolbar} from "./style.js";


const ModelsView = (props) => {

    const currentModel = useSelector(selectorCurrentViewedModel);
    const currentModelName = currentModel.model;
    const currentModelPackage = currentModel.package;
    const currentModelFullname = currentModel.fullModelName;

    const dispatch = useDispatch();

    const modelListSelector = useSelector(selectorModelList);
    const modelDataSelector = useSelector(selectorModelData);
    const updateModelSelector = useSelector(selectorUpdateModelData);

    const modelList = modelListSelector.modelList;
    const modelData = modelDataSelector.modelsData;

    const tableData = !currentModelFullname ? null : modelData[currentModelFullname];
    const fields = tableData ? tableData.headers : null;
    const rows = tableData ? tableData.rows : null;

    const selectedModelIndex = _.findIndex(modelList, {'model': currentModelName});

    const isMobile = useMediaQuery('(max-width: 1200px)');

    console.log(isMobile)

    useEffect(() => {
        dispatch(tryGetListOfModels());
    }, []);

    useEffect(() => {
        if (!currentModelPackage || !currentModelName) {
            return;
        }
        dispatch(getAllModelData(currentModelPackage, currentModelName));
    }, [currentModelName, currentModelPackage]);

    useEffect(() => {
        const path = updateModelSelector.path;
        const isUpdateModelCtx = path === 'updateModel';
        const isUpdateComplete = !updateModelSelector.requestSent && updateModelSelector.responseReceived;
        const hasNoErrors = updateModelSelector.errors.length === 0;

        if (isUpdateModelCtx && isUpdateComplete && hasNoErrors) {
            if (updateModelSelector.responseData) {
                const id = updateModelSelector.responseData['updated_id'];
                dispatch(getSingleRowModelData(currentModelPackage, currentModelName, id));
            }
        }
    }, [updateModelSelector]);

    const onSelected = useCallback((index, value) => {
        if (!value) {
            return;
        }
        dispatch(changeCurrentViewedModel(value.model, value.package));
    }, []);

    const renderTable = useCallback(() => {
        const path = modelDataSelector.path;
        const isCtx = path === 'getModel';
        const isPending = modelDataSelector.requestSent && !modelDataSelector.responseReceived;

        const path2 = modelListSelector.path;
        const isCtx2 = path2 === 'listModels';
        const isPending2 = modelListSelector.requestSent && !modelListSelector.responseReceived;

        if ((!rows && isCtx && isPending) || isCtx2 && isPending2) {
            return <div style={{marginTop: 100}}>
                <Spinner theme={spinnerTheme} text={null}/>
            </div>;
        }
        return <Table fields={fields} model={currentModelName} modelPackage={currentModelPackage} rows={rows}/>;
    }, [modelDataSelector, modelListSelector]);

    const onAddNewItemClick = useCallback(() => {
        dispatch(showDialog({
            component: CreateNewModelItemDialog,
            props: {
                fields: fields,
                modelName: currentModelName
            }
        }));
    }, [fields, currentModelName])

    const renderToolbar = useCallback(() => {
        const path = modelListSelector.path;
        const isCtx = path === 'listModels';
        const isPending = modelListSelector.requestSent && !modelListSelector.responseReceived;

        if (isCtx && isPending) {
            return <div style={{marginTop: 100}}>
                <Spinner theme={spinnerTheme} text={null}/>
            </div>;
        }
        return <StyledToolbar {...animatedWindowProps3}>
            <Select
                theme={modelSelectorTheme(isMobile)}
                items={modelList}
                dataItemRenderer={item => <div>Table - {item.model}</div>}
                itemValueProvider={item => <div>{item.model}</div>}
                initialIndex={selectedModelIndex >= 0 ? selectedModelIndex : 0}
                onChange={onSelected}
            />
            <Button theme={addItemButtonTheme} text={`Add new row`} onClick={onAddNewItemClick}/>
        </StyledToolbar>
    }, [modelListSelector, currentModelName, modelData, isMobile]);

    return <StyledModelsView>
        {renderToolbar()}
        {renderTable()}
    </StyledModelsView>;
};

export default ModelsView;