import {createSlice} from "@reduxjs/toolkit";

const mouseSlice = createSlice({
    name: "mouse",
    initialState: {
        pressed: false,
    },
    reducers: {
        onPress: (state) => {
            state.pressed = true;
        },
        onRelease: (state) => {
            state.pressed = false;
        }
    },
});

export const onMousePress = () => async dispatch => dispatch(onPress());
export const onMouseRelease = () => async dispatch => dispatch(onRelease());

export const selectorMouse = state => state.mouse;
export const {onPress, onRelease} = mouseSlice.actions;
export default mouseSlice.reducer;
