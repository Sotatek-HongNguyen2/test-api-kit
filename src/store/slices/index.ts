import { combineReducers } from "@reduxjs/toolkit";

import walletObjSlice from "./walletObjSlice";
import walletSlice from "./walletSlice";
import walletInstanceSlice from "./walletInstanceSlice";

const rootReducer = combineReducers({
  wallet: walletSlice,
  walletObj: walletObjSlice,
  walletInstance: walletInstanceSlice,
});

export default rootReducer;
