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

export interface AuthState {
  isLogin: boolean;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  isLogin: false,
  loading: false,
  error: "",
};

interface SignInResponse {
  access_token: string;
  role_name?: string;
  status?: boolean;
}

export const login = createAsyncThunk(
  "auth/signIn",
  async (data: any, thunkAPI) => {
    try {
      const response = await http.post<SignInResponse>("api/Customer/Login", {
        email: data.email,
        password: data.password,
      });

      console.log("response", response);

      saveTokenToSessionStorage(response.data.access_token);

      return response;
    } catch (error) {
      console.log("error login", error);
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      removeTokenFromSessionStorage();
      removeUserFromSessionStorage();
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogin = true;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
