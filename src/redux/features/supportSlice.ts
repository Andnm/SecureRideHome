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
  loadingSupport: boolean;
  error: string;
}

const initialState: SupportState = {
  isLogin: false,
  loadingSupport: false,
  error: "",
};

export const createSupport = createAsyncThunk(
  "support/createSupport",
  async (dataBody: any, thunkAPI) => {
    try {
      const response = await http.post<any>(`/api/Support`, dataBody);

      return response.data;
    } catch (error) {
      // console.log('error', error)
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const getAllSupportForAdmin = createAsyncThunk(
  "support/createSupport",
  async (dataBody: any, thunkAPI) => {
    const { pageIndex, pageSize } = dataBody;
    try {
      const response = await http.get<any>(
        `/api/Support?PageIndex=${pageIndex}&PageSize=${pageSize}&SortKey=DateCreated&SortOrder=DESC`,
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

export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get All User by admin
    builder.addCase(createSupport.pending, (state) => {
      state.loadingSupport = true;
      state.error = "";
    });
    builder.addCase(createSupport.fulfilled, (state, action) => {
      state.loadingSupport = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createSupport.rejected, (state, action) => {
      state.loadingSupport = false;
      state.error = action.payload as string;
    });
  },
});

export default supportSlice.reducer;
