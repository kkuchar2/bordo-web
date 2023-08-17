import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { RootState } from '@/state/store';

export interface AppSliceState {
    currentView: string;
}

const defaultState: AppSliceState = {
    currentView: 'home'
};

const appSlice = createSlice({
    name: 'app',
    initialState: defaultState,
    reducers: {
        onStoreCurrentView: (state, action) => {
            state.currentView = action.payload;
        }
    }
});

export const storeCurrentView = (viewId: string) => async (dispatch: Dispatch) => dispatch(onStoreCurrentView(viewId));

export const resetCurrentView = () => async (dispatch: Dispatch) => dispatch(onStoreCurrentView(defaultState.currentView));

export const currentView = (state: RootState) => state.app.currentView;

export const { onStoreCurrentView } = appSlice.actions;

export default appSlice.reducer;
