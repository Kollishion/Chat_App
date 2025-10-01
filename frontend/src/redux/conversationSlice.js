import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://chat-app-yg9v.onrender.com/api";

export const fetchConversation = createAsyncThunk(
  "conversations/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/users/chatContacts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data || "Network Error";
      return rejectWithValue(message);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    selectedConversation: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch conversations";
      });
  },
});

export const { setSelectedConversation, setConversations } =
  conversationSlice.actions;
export default conversationSlice.reducer;
