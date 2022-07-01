import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from 'appRedux/store';

import {AppSliceState} from './appSlice.types';

const defaultState: AppSliceState = {
    currentView: 'Home'
};

const appSlice = createSlice({
    name: 'app',
    initialState: defaultState,
    reducers: {
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

export const openView = (viewId: string) => async (dispatch: AppDispatch) => dispatch(onChangeView(viewId));

export const loadLastView = () => async (dispatch: AppDispatch) => dispatch(onLoadLastView());

export const selectorView = (state: RootState) => state.app.currentView;

export const { onChangeView, onLoadLastView } = appSlice.actions;

export default appSlice.reducer;
