import {createSlice, Dispatch} from '@reduxjs/toolkit';

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
            state.currentView = persistedView !== 'undefined' ? persistedView : 'home';
        },
        onChangeView: (state, action) => {
            state.currentView = action.payload;
            localStorage.setItem('currentView', action.payload);
        }
    }
});

export const changeCurrentViewedModel = (model: string, modelPackage: string) => async (dispatch: Dispatch) => {
    return dispatch(onChangeCurrentModel({ 'package': modelPackage, 'model': model }));
};

export const changeTheme = (theme: string) => (dispatch: Dispatch) => dispatch(onChangeTheme(theme));

export const openView = (viewId: string) => async (dispatch: Dispatch) => dispatch(onChangeView(viewId));

export const loadLastView = () => async (dispatch: Dispatch) => dispatch(onLoadLastView());

export const selectorView = (state: any) => state.app.currentView;

export const selectorTheme = (state: any) => state.app.theme;

export const { onChangeView, onLoadLastView, onChangeTheme, onChangeCurrentModel } = appSlice.actions;

export default appSlice.reducer;
