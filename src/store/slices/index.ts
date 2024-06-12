import { combineReducers } from "@reduxjs/toolkit";

import walletObjSlice from "./walletObjSlice";
import walletSlice from "./walletSlice";
import walletInstanceSlice from "./walletInstanceSlice";
import AuthInstanceSlide from "./authSlides";

const rootReducer = combineReducers({
  wallet: walletSlice,
  walletObj: walletObjSlice,
  walletInstance: walletInstanceSlice,
  authSlides: AuthInstanceSlide,
});

export default rootReducer;
