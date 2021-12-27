import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OutlinerState {
    open: boolean;
    width: number;
}

const initialState: OutlinerState = {
    open: true,
    width: 240
};

const slice = createSlice({
    name: 'outliner',
    initialState,
    reducers: {
        toggle: (state) => {
            state.open = !state.open;
            if (state.open) {
                state.width = 240;
            } else {
                state.width = 0;
            }
        },
        setWidth: (state, action: PayloadAction<any>) => {
            const { width } = action.payload;
            state.width = width;
        }
    }
});

export default slice;
