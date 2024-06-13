import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";

import rootReducer from "./slices";

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["walletObj", "walletInstance"],
};

export const store = configureStore<RootState & PersistPartial>({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: import.meta.env.MODE !== "production",
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export function createAppThunk<E>() {
  return createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: E;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
  }>();
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getWalletSlice = (state: RootState) => state.wallet;
export const getAuthSlide = (state: RootState) => state.authSlides;
export const getWalletObjSlice = (state: RootState) => state.walletObj;
export const getWalletInstanceSlice = (state: RootState) =>
  state.walletInstance;
