import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseURL = "https://chat-app-yg9v.onrender.com";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        credentials,
        { withCredentials: true }
      );

      sessionStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed!");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed!");
    }
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
      return rejectWithValue(error.response?.data || "Password reset failed!");
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
      return rejectWithValue(error.response?.data || "Password reset failed!");
    }
  }
);

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  isAuthenticated: !!sessionStorage.getItem("user"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      sessionStorage.removeItem("user");
      toast.success("You have successfully logged out.");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
        toast.success(`Welcome back, ${action.payload.username}!`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed!";
        toast.error(state.error);
      })

      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        toast.success("Signup successful! Please log in.");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Signup failed!";
        toast.error(state.error);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
