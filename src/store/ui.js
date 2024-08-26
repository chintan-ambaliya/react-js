import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isOpenSidebar: true,
    },
    reducers: {
        toggleSidebar(state) {
            state.isOpenSidebar = !state.isOpenSidebar;
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;