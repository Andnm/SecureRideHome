import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import supportReducer from "./features/supportSlice";
import bookingReducer from "./features/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    support: supportReducer,
    user: userReducer,
    booking: bookingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
