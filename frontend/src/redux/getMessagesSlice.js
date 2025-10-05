import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { toast } from "react-hot-toast";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-yg9v.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMessage = createAsyncThunk(
  "messages/getMessage",
  async ({ conversationId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/messages/${conversationId}`
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to fetch messages";
      return rejectWithValue(message);
    }
  }
);

export const selectMessagesByConversationId = createSelector(
  (state) => state.getMessagesSlice.conversations,
  (_, conversationId) => conversationId,
  (conversations, conversationId) => {
    const conversation = conversations.find(
      (conv) => conv._id === conversationId
    );
    return conversation ? conversation.messages : [];
  }
);

const getMessagesSlice = createSlice({
  name: "getMessagesSlice",
  initialState: {
    conversations: [], // [{ _id, messages: [] }]
    selectedMessage: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;
    },
    clearMessages: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv._id === conversationId
      );
      if (conversation) {
        conversation.messages = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.loading = false;
        const conversationId = action.meta.arg.conversationId;

        // Normalize payload into array
        const messages = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        const conversation = state.conversations.find(
          (conv) => conv._id === conversationId
        );

        if (conversation) {
          conversation.messages = messages;
        } else {
          state.conversations.push({
            _id: conversationId,
            messages,
          });
        }

        toast.success("Messages fetched successfully!");
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch messages");
      });
  },
});

export const { setSelectedMessage, clearMessages } = getMessagesSlice.actions;
export default getMessagesSlice.reducer;
