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

export interface BookingState {
  data: boolean;
  loadingBooking: boolean;
  error: string;
}

const initialState: BookingState = {
  data: false,
  loadingBooking: false,
  error: "",
};

export const getAllBookingForAdmin = createAsyncThunk(
    "booking/getAllBookingForAdmin",
    async (dataBody: any, thunkAPI) => {
      const { pageIndex, pageSize } = dataBody;
      try {
        const response = await http.get<any>(
          `/api/Admin/Booking/All?PageIndex=${pageIndex}&PageSize=${pageSize}&SortKey=DateCreated&SortOrder=DESC`,
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

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAllBookingForAdmin
    builder.addCase(getAllBookingForAdmin.pending, (state) => {
      state.loadingBooking = true;
      state.error = "";
    });
    builder.addCase(getAllBookingForAdmin.fulfilled, (state, action) => {
      state.loadingBooking = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllBookingForAdmin.rejected, (state, action) => {
      state.loadingBooking = false;
      state.error = action.payload as string;
    });
  },
});

export default bookingSlice.reducer;
