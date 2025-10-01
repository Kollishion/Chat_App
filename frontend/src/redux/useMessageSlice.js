import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "conversations/sendMessage",
  async ({ message, conversationId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://chat-app-yg9v.onrender.com/api/api/messages/send/${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    selectedConversation: null,
    loading: false,
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
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { conversationId } = action.meta.arg;

        const conversation = state.conversations.find(
          (conv) => conv._id === conversationId
        );

        if (conversation) {
          conversation.messages.push(action.payload);
        } else {
          state.conversations.push({
            _id: conversationId,
            messages: [action.payload],
          });
        }
      })
      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
