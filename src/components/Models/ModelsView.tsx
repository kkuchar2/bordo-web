import React, {useCallback, useEffect} from "react";

import {useMediaQuery} from "@material-ui/core";
import {
    getAllModelData, getMultiRowModelData,
    selectorAddItemToTable,
    selectorModelData,
    selectorModelList,
    tryGetListOfModels
} from "appRedux/reducers/api/crud";
import {changeCurrentViewedModel, openDialog, selectorCurrentViewedModel} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {defaultShowUpAnimation} from "components/FormComponents/animation";
import {spinnerTheme} from "components/FormComponents/commonStyles";
import Table from "components/Models/Table/Table";
import {Button, Select, Spinner, Text} from "kuchkr-react-component-library";
import {useSelector} from "react-redux";
import {OptionsType} from "react-select";

import {withRequestComplete} from "../../api/util";

import {
    addItemButtonTheme,
    modelSelectorTheme,
    StyledModelsView,
    StyledToolbar,
    StyledPlusIcon, addRowTextTheme, StyledImportIcon, importCSVButtonTheme
} from "./style";

const ModelsView = () => {

    const currentModel = useSelector(selectorCurrentViewedModel);
    const currentModelName = currentModel.model;
    const currentModelPackage = currentModel.package;
    const currentModelFullName = currentModel.fullModelName;

    const dispatch = useAppDispatch();

    const modelListSelector = useSelector(selectorModelList);
    const modelDataSelector = useSelector(selectorModelData);
    const addItemToTableSelector = useSelector(selectorAddItemToTable);

    const modelData = modelDataSelector.modelsData;

    const tableData = !currentModelFullName ? null : modelData[currentModelFullName];
    const fields = tableData ? tableData.headers : null;
    const rows = tableData ? tableData.rows : null;

    const isMobile = useMediaQuery('(max-width: 1200px)');

    useEffect(() => {
        dispatch(tryGetListOfModels());
    }, []);

    useEffect(() => {
        if (!currentModelPackage || !currentModelName) {
            return;
        }
        dispatch(getAllModelData(currentModelPackage, currentModelName));
    }, [currentModelName, currentModelPackage]);

    withRequestComplete(modelDataSelector, 'updateModel', () => {
        const ids = modelDataSelector.updateInfo['updated_ids'];
        dispatch(getMultiRowModelData(currentModelPackage, currentModelName, ids));
    });

    withRequestComplete(addItemToTableSelector, 'addItem', () => {
        dispatch(getAllModelData(currentModelPackage, currentModelName));
    });

    const onSelected = useCallback((selectedOption) => {
        if (!selectedOption) {
            return;
        }

        const value = selectedOption.value;

        if (!value) {
            return;
        }
        dispatch(changeCurrentViewedModel(value.model, value.package));
    }, []);

    const renderTable = useCallback(() => {
        return <Table fields={fields} model={currentModelName} modelPackage={currentModelPackage} rows={rows}/>;
    }, [fields, currentModelName, currentModelPackage, rows]);

    const onAddNewItemClick = useCallback(() => {
        dispatch(openDialog({
            component: "CreateNewModelItemDialog",
            props: {
                fields: fields,
                modelPackage: currentModelPackage,
                modelName: currentModelName
            }
        }));
    }, [fields, currentModelName]);

    // TODO: please refactor this my god
    let modelListResponse = modelListSelector.responseData ? modelListSelector.responseData : null;
    let modelList = modelListResponse ? modelListResponse.data : [];
    modelList = modelList ? modelList : [];

    const modelListForSelect: OptionsType<any> = Object.keys(modelList).length === 0 ? [] : modelList.map((x: any) => {
        return {value: x, label: x.model};
    });

    const renderToolbar = useCallback(() => {
        const path = modelListSelector.path;
        const isCtx = path === 'listModels';
        const isPending = modelListSelector.requestState.pending;

        if (isCtx && isPending) {
            return <div style={{marginTop: 100}}>
                <Spinner theme={spinnerTheme} text={undefined}/>
            </div>;
        }

        return <StyledToolbar>
            <Select
                theme={modelSelectorTheme(isMobile)}
                options={modelListForSelect}
                defaultValue={modelListForSelect[0]}
                placeholder={'Select table'}
                disabled={false}
                isSearchable={false}
                onChange={onSelected}
                triggerOnDefault={true}
            />
            <Button theme={addItemButtonTheme} onClick={onAddNewItemClick}>
                <StyledPlusIcon />
                <Text theme={addRowTextTheme} text={'Add new object'} />
            </Button>
            <Button theme={importCSVButtonTheme} onClick={onAddNewItemClick}>
                <StyledImportIcon />
                <Text theme={addRowTextTheme} text={'Import from CSV file'} />
            </Button>
        </StyledToolbar>;
    }, [modelListSelector, currentModelName, modelData, isMobile]);

    return <StyledModelsView {...defaultShowUpAnimation}>
            {renderToolbar()}
            {renderTable()}
        </StyledModelsView>;
};

export default ModelsView;