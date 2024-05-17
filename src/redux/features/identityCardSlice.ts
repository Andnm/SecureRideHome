import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ErrorType } from "@/src/types/error.type";

import {
  getJsonConfigHeader,
  getFormDataConfigHeader,
} from "../utils/handleToken";

export interface IdentityCardState {
  data: boolean;
  loadingIdentityCard: boolean;
  error: string;
}

const initialState: IdentityCardState = {
  data: false,
  loadingIdentityCard: false,
  error: "",
};

export const createIdentityCardByAdmin = createAsyncThunk(
  "identityCard/createIdentityCardByAdmin",
  async (data: any, thunkAPI) => {
    const { driverId, dataBody } = data;
    try {
      const response = await http.post<any>(
        `/api/Admin/IdentityCard/${driverId}`,
        dataBody,
        getJsonConfigHeader()
      );

      return response.data;
    } catch (error) {
      console.log('error identity', error)
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
        `/api/Admin/IdentityCard/IdentityCardImage`,
        data,
        getFormDataConfigHeader()
      );

      return response.data;
    } catch (error) {
      console.log('error identity image', error)
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const getIdentityCardByAdmin = createAsyncThunk(
  "identityCard/getIdentityCardByAdmin",
  async (userId: string, thunkAPI) => {
    try {
      const response = await http.get<any>(
        `/api/Admin/IdentityCard/${userId}`,
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

export const getIdentityCardImageByAdmin = createAsyncThunk(
  "identityCard/getIdentityCardImageByAdmin",
  async (identityCardId: string, thunkAPI) => {
    try {
      const response = await http.get<any>(
        `/api/Admin/IdentityCard/IdentityCardImage/${identityCardId}`,
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

export const identityCardSlice = createSlice({
  name: "identityCard",
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
    //getIdentityCardByAdmin
    builder.addCase(getIdentityCardByAdmin.pending, (state) => {
      state.loadingIdentityCard = true;
      state.error = "";
    });
    builder.addCase(getIdentityCardByAdmin.fulfilled, (state, action) => {
      state.loadingIdentityCard = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getIdentityCardByAdmin.rejected, (state, action) => {
      state.loadingIdentityCard = false;
      state.error = action.payload as string;
    });
    //getIdentityCardImageByAdmin
    builder.addCase(getIdentityCardImageByAdmin.pending, (state) => {
      state.loadingIdentityCard = true;
      state.error = "";
    });
    builder.addCase(getIdentityCardImageByAdmin.fulfilled, (state, action) => {
      state.loadingIdentityCard = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getIdentityCardImageByAdmin.rejected, (state, action) => {
      state.loadingIdentityCard = false;
      state.error = action.payload as string;
    });
  },
});

export default identityCardSlice.reducer;
