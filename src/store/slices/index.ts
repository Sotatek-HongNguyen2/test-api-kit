import { combineReducers } from "@reduxjs/toolkit";

import walletObjSlice from "./walletObjSlice";
import walletSlice from "./walletSlice";
import walletInstanceSlice from "./walletInstanceSlice";
import AuthInstanceSlide from "./authSlides";
import commonInstanceSlide from "./common";
import balancesSlice from "./useBalances";
import informationInstanceSlide from "./information";

const rootReducer = combineReducers({
  wallet: walletSlice,
  walletObj: walletObjSlice,
  walletInstance: walletInstanceSlice,
  authSlides: AuthInstanceSlide,
  commonSlides: commonInstanceSlide,
  balanceSlide: balancesSlice,
  informationInstanceSlide: informationInstanceSlide,
});

export default rootReducer;
