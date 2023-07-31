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
        onLoadLastView: state => {
            const persistedView = localStorage.getItem('currentView');
            if (persistedView) {
                state.currentView = persistedView ? persistedView : 'home';
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

export const storeCurrentView = (viewId: string) => async (dispatch: Dispatch) => dispatch(onStoreCurrentView(viewId));

export const clearCurrentView = () => async (dispatch: Dispatch) => dispatch(onStoreCurrentView(null));

export const loadLastView = () => async (dispatch: Dispatch) => dispatch(onLoadLastView());

export const currentView = (state: RootState) => state.app.currentView;

export const { onStoreCurrentView, onLoadLastView } = appSlice.actions;

export default appSlice.reducer;
