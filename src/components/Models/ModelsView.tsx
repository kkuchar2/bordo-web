import React, {ReactNode, useCallback, useEffect} from "react";

import {useMediaQuery} from "@material-ui/core";
import {
    getAllModelData,
    getMultiRowModelData,
    selectorAddItemToTable,
    selectorModelData,
    selectorModelList,
    tryGetListOfModels
} from "appRedux/reducers/api/crud";
import {
    changeCurrentViewedModel,
    selectorCurrentViewedModel
} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {showCreateModelItemDialog} from "components/Dialogs/readyDialogs";
import {spinnerTheme} from "components/Forms/commonStyles";
import Table from "components/Models/Table/Table";
import {Button, Select, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import OptionsType from "react-select";
import StateManagedSelect from "react-select";
import styled from "styled-components";

import {withRequestComplete} from "../../api/util";

import {
    addItemButtonTheme,
    addRowTextTheme,
    modelSelectorTheme,
    StyledModelsView,
    StyledPlusIcon,
    StyledToolbar
} from "./style";

const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledOptionValue = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const StyledOptionIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const StyledLabel = styled.div`
  font-size: 1.1em;
`;

const StyledValue = styled.div`
  font-size: 0.9em;
`;

const customOptionRenderer = (option: StateManagedSelect): ReactNode => {

    return <StyledOption>
        <StyledOptionIcon>
            📚
        </StyledOptionIcon>
        <StyledOptionValue>
            <StyledLabel>{option.model}</StyledLabel>
            <StyledValue>{option.package}</StyledValue>
        </StyledOptionValue>
    </StyledOption>;
};

const ModelsView = () => {

    const currentModel = useSelector(selectorCurrentViewedModel);
    const currentModelName = currentModel.model;
    const currentModelPackage = currentModel.package;
    const currentModelFullName = currentModel.fullModelName;

    const modelListSelector = useSelector(selectorModelList);
    const modelDataSelector = useSelector(selectorModelData);
    const addItemToTableSelector = useSelector(selectorAddItemToTable);

    const dispatch = useAppDispatch();

    const {t} = useTranslation();

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
        showCreateModelItemDialog(dispatch, t, fields, currentModelPackage, currentModelName);
    }, [fields, currentModelName]);

    // TODO: please refactor this my god
    let modelListResponse = modelListSelector.responseData ? modelListSelector.responseData : null;
    let modelList = modelListResponse ? modelListResponse.data : [];
    modelList = modelList ? modelList : [];

    const modelListForSelect: OptionsType = Object.keys(modelList).length === 0 ? [] : modelList.map((x: any) => {
        return {value: x, label: x};
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
                placeholder={'Select table'}
                disabled={false}
                menuPortalTarget={document.body}
                customOptionRenderer={customOptionRenderer}
                maxMenuHeight={230}
                isSearchable={false}
                onChange={onSelected}
                triggerOnDefault={true}
            />
            <Button theme={addItemButtonTheme} onClick={onAddNewItemClick}>
                <StyledPlusIcon/>
                <Text theme={addRowTextTheme} text={t('ADD_NEW_ROW')}/>
            </Button>
        </StyledToolbar>;
    }, [modelListSelector, currentModelName, modelData, isMobile]);

    return <StyledModelsView>
        {renderToolbar()}
        {renderTable()}
    </StyledModelsView>;
};

export default ModelsView;