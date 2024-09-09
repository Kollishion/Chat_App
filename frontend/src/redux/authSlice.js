import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await axios.post(`${baseURL}/api/auth/login`, credentials);
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData) => {
    const response = await axios.post(`${baseURL}/api/auth/signup`, userData);
    return response.data;
  }
);

export const forgetPasswordUser = createAsyncThunk(
  "auth/forgetPasswordUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/forgetpassword`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPasswordUser",
  async ({ id, token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/resetPassword/${id}/${token}`,
        { password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
