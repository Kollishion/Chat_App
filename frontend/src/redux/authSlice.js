import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { initializeSocket, getSocket } from "./socketSlice";
import { io } from "socket.io-client";
const baseURL = "http://localhost:5000";

// Login user action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        credentials,
        { withCredentials: true }
      );
      // Store the authentication status and user info in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Signup user action
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

// Forgot password action
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
      return rejectWithValue(error.response?.data || "Password reset failed");
    }
  }
);

// Reset password action
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
      return rejectWithValue(error.response?.data || "Password reset failed");
    }
  }
);

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  isAuthenticated: !!sessionStorage.getItem("user"),
  status: "idle",
  error: null,
  socket: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      const socket = getSocket();
      if (socket) {
        socket.disconnect();
        console.log("Socket Disconnected");
      }
      state.user = null;
      state.isAuthenticated = false;
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
        toast.success("Welcome back!");
        console.log("Login API Response Payload:", action.payload);
        const userId = action.payload?._id || action.payload?.userId;
        if (!userId) {
          console.error("Failed to initialize socket: User ID is missing");
          return;
        }
        console.log("User ID for socket initialization:", userId);
        let socket = initializeSocket(userId);
        if (!socket || !socket.connected) {
          socket = io(baseURL, { query: { userId } });
          console.log("Socket initialized with ID:", userId);
        }
        if (socket) {
          socket.on("connect", () => {
            console.log("Socket Connected:", socket.id);
          });
          socket.on("getOnlineUsers", (users) => {
            console.log("Online users:", users);
          });
          socket.on("disconnect", () => {
            console.log("Socket Disconnected.");
          });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(
          typeof action.payload === "string"
            ? action.payload
            : "Login failed. Please try again."
        );
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        toast.success("Now Log in with your credentials");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(
          typeof action.payload === "string"
            ? action.payload
            : "Signup failed. Please try again."
        );
      });
  },
});

// Exporting logout action
export const { logout } = authSlice.actions;

// Exporting the reducer
export default authSlice.reducer;
