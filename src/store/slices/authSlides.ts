import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state type
export type AuthType = {
  accessToken: string | null;
  refreshToken: string | null;
};

// init state
const initialState: AuthType = {
  accessToken: null,
  refreshToken: null,
};

// slice create
export const AuthInstanceSlide = createSlice({
  name: "walletInstance",
  initialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    updateRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    deleteAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// normal flow action
export const authInstanceSlideActions = { ...AuthInstanceSlide.actions };

// export
export default AuthInstanceSlide.reducer;
