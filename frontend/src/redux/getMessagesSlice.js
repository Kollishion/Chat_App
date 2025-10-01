import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { createSelector } from "reselect";

//Thunk for handling getMessage request
export const getMessage = createAsyncThunk(
  "conversations/getMessage",
  async ({ conversationId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://chat-app-yg9v.onrender.com/api/api/messages/${conversationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.error("Error in getMessage:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Selector to get messages for a specific conversation
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

//Slice for getting the messages
const getMessagesSlice = createSlice({
  name: "getMessagesSlice",
  initialState: {
    conversations: [],
    selectedMessage: null,
    loading: false,
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
      //pending state
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
      })
      //fulfilled state
      .addCase(getMessage.fulfilled, (state, action) => {
        state.loading = false;
        const conversationId = action.meta.arg.conversationId;

        const conversation = state.conversations.find(
          (conv) => conv._id === conversationId
        );

        if (conversation) {
          conversation.messages = Array.isArray(action.payload)
            ? action.payload
            : [action.payload];
        } else {
          state.conversations.push({
            _id: conversationId,
            messages: Array.isArray(action.payload)
              ? action.payload
              : [action.payload],
          });
        }

        toast.success("Messages fetched successfully!");
      })
      //rejected state
      .addCase(getMessage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedMessage, clearMessages } = getMessagesSlice.actions;
export default getMessagesSlice.reducer;
