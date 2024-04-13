import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { UserType } from "@/src/types/user.type";
import {
  getConfigHeader,
  getTokenFromSessionStorage,
} from "../utils/handleToken";
import { ErrorType } from "@/src/types/error.type";

export interface UserState {
  token: string | null;
  loadingUser: boolean;
  error: string;
}

const initialState: UserState = {
  token: null,
  loadingUser: false,
  error: "",
};

export const getAllUserByAdmin = createAsyncThunk(
  "user/getAllUserByAdmin",
  async (dataBody: any, thunkAPI) => {
    const { pageIndex, pageSize } = dataBody;
    try {
      const response = await http.get<any>(
        `/api/Customer/GetUserByAdmin?PageIndex=${pageIndex}&PageSize=${pageSize}&SortKey=DateCreated&SortOrder=DESC`,
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

export const createDriverAccountByAdmin = createAsyncThunk(
  "user/createDriverAccountByAdmin",
  async (dataBody: any, thunkAPI) => {
    try {
      const response = await http.post<any>(
        `/api/Driver/RegisterByAdmin`,
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



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get All User by admin
    builder.addCase(getAllUserByAdmin.pending, (state) => {
      state.loadingUser = true;
      state.error = "";
    });
    builder.addCase(getAllUserByAdmin.fulfilled, (state, action) => {
      state.loadingUser = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllUserByAdmin.rejected, (state, action) => {
      state.loadingUser = false;
      state.error = action.payload as string;
    });

    //createDriverAccountByAdmin
    builder.addCase(createDriverAccountByAdmin.pending, (state) => {
      state.loadingUser = true;
      state.error = "";
    });
    builder.addCase(createDriverAccountByAdmin.fulfilled, (state, action) => {
      state.loadingUser = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createDriverAccountByAdmin.rejected, (state, action) => {
      state.loadingUser = false;
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
