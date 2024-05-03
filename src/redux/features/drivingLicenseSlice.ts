import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ErrorType } from "@/src/types/error.type";

import {
  saveTokenToSessionStorage,
  removeTokenFromSessionStorage,
  decodeTokenToUser,
  getJsonConfigHeader,
  getFormDataConfigHeader,
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
  loadingDrivingLicense: boolean;
  error: string;
}

const initialState: SupportState = {
  isLogin: false,
  loadingDrivingLicense: false,
  error: "",
};

export const createDrivingLicenseForDriverByAdmin = createAsyncThunk(
  "drivingLicense/createDrivingLicenseForDriverByAdmin",
  async (data: any, thunkAPI) => {
    const { driverId, dataBody } = data;
    try {
      const response = await http.post<any>(
        `/api/DrivingLicense/ByAdmin/${driverId}`,
        dataBody,
        getJsonConfigHeader()
      );

      return response.data;
    } catch (error) {
      console.log('error dlc', error)
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const createDrivingLicenseImgForDriver = createAsyncThunk(
  "drivingLicense/createDrivingLicenseImgForDriver",
  async (data: any, thunkAPI) => {
    try {
      const response = await http.post<any>(
        `/api/DrivingLicense/ByAdmin/DrivingLicenseImage`,
        data,
        getFormDataConfigHeader(),
      );

      return response.data;
    } catch (error) {
      console.log('error dlc img', error)
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const drivingLicenseSlice = createSlice({
  name: "drivingLicense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create driving license
    builder.addCase(createDrivingLicenseForDriverByAdmin.pending, (state) => {
      state.loadingDrivingLicense = true;
      state.error = "";
    });
    builder.addCase(
      createDrivingLicenseForDriverByAdmin.fulfilled,
      (state, action) => {
        state.loadingDrivingLicense = false;
        // state.data = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      createDrivingLicenseForDriverByAdmin.rejected,
      (state, action) => {
        state.loadingDrivingLicense = false;
        state.error = action.payload as string;
      }
    );

    //createDrivingLicenseImgForDriver
    builder.addCase(createDrivingLicenseImgForDriver.pending, (state) => {
      state.loadingDrivingLicense = true;
      state.error = "";
    });
    builder.addCase(
      createDrivingLicenseImgForDriver.fulfilled,
      (state, action) => {
        state.loadingDrivingLicense = false;
        // state.data = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      createDrivingLicenseImgForDriver.rejected,
      (state, action) => {
        state.loadingDrivingLicense = false;
        state.error = action.payload as string;
      }
    );
  },
});

export default drivingLicenseSlice.reducer;