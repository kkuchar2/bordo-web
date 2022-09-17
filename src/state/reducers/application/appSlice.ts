import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {RootState} from 'state/store';

import {AppSliceState} from './appSlice.types';

const defaultState: AppSliceState = {
    currentView: 'Home',
    theme: 'dark',
    currentModel: {
        model: '',
        package: '',
        fullModelName: '',
    }
};

const appSlice = createSlice({
    name: 'app',
    initialState: defaultState,
    reducers: {
        onChangeCurrentModel: (state, action) => {
            const data = action.payload;
            state.currentModel = {
                model: data.model,
                package: data.package,
                fullModelName: data.package + '.' + data.model
            };
        },
        onChangeTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        onLoadLastView: state => {
            const persistedView = localStorage.getItem('currentView');
            if (persistedView) {
                state.currentView = persistedView ? persistedView : 'Home';
            }
        },
        onStoreCurrentView: (state, action) => {
            state.currentView = action.payload;
            const viewId = action.payload;
            if (viewId) {
                localStorage.setItem('currentView', action.payload);
            }
            else {
                localStorage.removeItem('currentView');
            }
        }
    }
});

export const changeCurrentViewedModel = (model: string, modelPackage: string) => async (dispatch: Dispatch) => {
    return dispatch(onChangeCurrentModel({ 'package': modelPackage, 'model': model }));
};

export const changeTheme = (theme: string) => (dispatch: Dispatch) => dispatch(onChangeTheme(theme));

export const storeCurrentView = (viewId: string) => async (dispatch: Dispatch) => dispatch(onStoreCurrentView(viewId));

export const clearCurrentView = () => async (dispatch: Dispatch) => dispatch(onStoreCurrentView(null));

export const loadLastView = () => async (dispatch: Dispatch) => dispatch(onLoadLastView());

export const currentView = (state: RootState) => state.app.currentView;

export const selectorTheme = (state: any) => state.app.theme;

export const { onStoreCurrentView, onLoadLastView, onChangeTheme, onChangeCurrentModel } = appSlice.actions;

export default appSlice.reducer;
