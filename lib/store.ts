import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/lib/features/upgrade/upgradeSlice";

export const makeStore = () => {
  return configureStore({
    reducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
