import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ErrorType } from "@/src/types/error.type";

import {
  saveTokenToSessionStorage,
  removeTokenFromSessionStorage,
  decodeTokenToUser,
  getConfigHeader,
} from "../utils/handleToken";

import {
  saveUserToSessionStorage,
  removeUserFromSessionStorage,
} from "../utils/handleUser";
import { OtpType } from "@/src/types/otp.type";
import {
  getOtpFromSessionStorage,
  removeOtpFromSessionStorage,
  saveOtpToSessionStorage,
} from "../utils/handleOtp";

export interface SupportState {
  isLogin: boolean;
  loadingIdentityCard: boolean;
  error: string;
}

const initialState: SupportState = {
  isLogin: false,
  loadingIdentityCard: false,
  error: "",
};

export const createIdentityCardByAdmin = createAsyncThunk(
  "identityCard/createIdentityCardByAdmin",
  async (data: any, thunkAPI) => {
    const { driverId, dataBody } = data;
    try {
      const response = await http.post<any>(
        `/api/IdentityCard/ByAdmin/${driverId}`,
        dataBody,
        getConfigHeader()
      );

      return response.data;
    } catch (error) {
      // console.log('error', error)
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const createIdentityCardImageByAdmin = createAsyncThunk(
  "identityCard/createIdentityCardImageByAdmin",
  async (data: any, thunkAPI) => {
    try {
      const response = await http.post<any>(
        `/api/IdentityCard/IdentityCardImage/ByAdmin`,
        data,
        getConfigHeader()
      );

      return response.data;
    } catch (error) {
      // console.log('error', error)
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const identityCardSlice = createSlice({
  name: "identity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //createIdentityCardImageByAdmin
    builder.addCase(createIdentityCardImageByAdmin.pending, (state) => {
      state.loadingIdentityCard = true;
      state.error = "";
    });
    builder.addCase(createIdentityCardImageByAdmin.fulfilled, (state, action) => {
      state.loadingIdentityCard = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createIdentityCardImageByAdmin.rejected, (state, action) => {
      state.loadingIdentityCard = false;
      state.error = action.payload as string;
    });
    //createIdentityCardByAdmin
    builder.addCase(createIdentityCardByAdmin.pending, (state) => {
      state.loadingIdentityCard = true;
      state.error = "";
    });
    builder.addCase(createIdentityCardByAdmin.fulfilled, (state, action) => {
      state.loadingIdentityCard = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createIdentityCardByAdmin.rejected, (state, action) => {
      state.loadingIdentityCard = false;
      state.error = action.payload as string;
    });
  },
});

export default identityCardSlice.reducer;
