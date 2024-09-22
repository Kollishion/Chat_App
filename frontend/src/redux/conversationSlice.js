import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000";

export const fetchConversation = createAsyncThunk(
  "conversations/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/users/chatContacts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    selectedConversation: null,
    status: "idle", // idle | loading | succeeded | failed
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
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedConversation } = conversationSlice.actions;
export const { setConversations } = conversationSlice.actions;
export default conversationSlice.reducer;
