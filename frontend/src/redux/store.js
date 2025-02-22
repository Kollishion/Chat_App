import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import conversationReducer from "./conversationSlice";
import getMessagesSlice from "./getMessagesSlice";

const preloadedState = {
  auth: {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    isAuthenticated: !!sessionStorage.getItem("user"),
    status: "idle",
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversations: conversationReducer,
    getMessagesSlice: getMessagesSlice,
  },
  preloadedState,
});
