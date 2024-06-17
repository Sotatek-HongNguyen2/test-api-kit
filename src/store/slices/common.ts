import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// state type
export type CommonType = {
    isMatchNetwork: boolean
};

// init state
const initialState: CommonType = {
    isMatchNetwork: true
};

// slice create
export const commonInstanceSlide = createSlice({
    name: "common",
    initialState,
    reducers: {
        updateIsMatchNetwork(state, action: PayloadAction<boolean>) {
            state.isMatchNetwork = action.payload
        },

    },
});

// normal flow action
export const commonInstanceSlideActions = { ...commonInstanceSlide.actions };

// export
export default commonInstanceSlide.reducer;

