import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ErrorType } from "@/src/types/error.type";

import {
  saveTokenToSessionStorage,
  removeTokenFromSessionStorage,
  decodeTokenToUser,
  getJsonConfigHeader,
} from "../utils/handleToken";

import {
  saveUserToSessionStorage,
  removeUserFromSessionStorage,
} from "../utils/handleUser";
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
    console.log("support", dataBody);
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
        getJsonConfigHeader()
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

export const changeSupportStatus = createAsyncThunk(
  "support/changeSupportStatus",
  async (dataBody: any, thunkAPI) => {
    console.log("support status data", dataBody);

    const { supportId, status } = dataBody;

    const lowerCaseStatus = status.toLowerCase();
    let statusApi;
    switch (lowerCaseStatus) {
      case "inprocess":
        statusApi = "ChangeStatusToInProcess";
        break;
      case "solved":
        statusApi = "ChangeStatusToSolved";
        break;
      case "cantsolved":
        statusApi = "ChangeStatusToCantSolved";
        break;
    }

    try {
      const response = await http.put<any>(
        `/api/Support/${statusApi}/${supportId}`,
        [],
        getJsonConfigHeader()
      );

      return response.data;
    } catch (error) {
      console.log("error change support status", error);
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

    //changeSupportStatus
    builder.addCase(changeSupportStatus.pending, (state) => {
      // state.loadingSupport = true;
      state.error = "";
    });
    builder.addCase(changeSupportStatus.fulfilled, (state, action) => {
      // state.loadingSupport = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(changeSupportStatus.rejected, (state, action) => {
      // state.loadingSupport = false;
      state.error = action.payload as string;
    });
  },
});

export default supportSlice.reducer;
