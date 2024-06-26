import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// state type
export type CommonType = {
  avatar: string;
  country: string;
  email: string;
  gender: string;
  name: string;
};

// init state
const initialState: CommonType = {
  avatar: "",
  country: "",
  email: "",
  gender: "",
  name: "",
};

// slice create
export const informationInstanceSlide = createSlice({
  name: "information",
  initialState,
  reducers: {
    updateInformation(state, action: PayloadAction<CommonType>) {
      state.avatar = action.payload.avatar;
      state.country = action.payload.country;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.name = action.payload.name;
    },
  },
});

// normal flow action
export const informationInstanceSlideActions = {
  ...informationInstanceSlide.actions,
};

// export
export default informationInstanceSlide.reducer;
