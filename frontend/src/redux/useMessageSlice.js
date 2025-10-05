import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-yg9v.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ message, conversationId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/messages/send/${conversationId}`,
        { message }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error sending message:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to send message";
      return rejectWithValue(message);
    }
  }
);

const sendMessageSlice = createSlice({
  name: "sendMessageSlice",
  initialState: {
    conversations: [],
    selectedConversation: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { conversationId } = action.meta.arg;
        const messageData = action.payload;

        const conversation = state.conversations.find(
          (conv) => conv._id === conversationId
        );

        if (conversation) {
          conversation.messages.push(messageData);
        } else {
          state.conversations.push({
            _id: conversationId,
            messages: [messageData],
          });
        }

        toast.success("Message sent ✅");
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to send message");
      });
  },
});

export const { setSelectedConversation } = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
