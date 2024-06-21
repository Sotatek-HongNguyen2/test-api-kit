import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// state type
export type CommonType = {
  isMatchNetwork: boolean;
  open: boolean;
};

// init state
const initialState: CommonType = {
  isMatchNetwork: true,
  open: false,
};

// slice create
export const commonInstanceSlide = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateIsMatchNetwork(state, action: PayloadAction<boolean>) {
      state.isMatchNetwork = action.payload;
    },
    updateOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

// normal flow action
export const commonInstanceSlideActions = { ...commonInstanceSlide.actions };

// export
export default commonInstanceSlide.reducer;
