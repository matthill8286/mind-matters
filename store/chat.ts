import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { sendChat, ChatMessage } from '@/lib/api';

interface ChatState {
  messagesByIssue: Record<string, ChatMessage[]>;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messagesByIssue: {},
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    params: {
      issueKey: string;
      issueTitle?: string;
      issueTags?: string[];
      text: string;
    },
    { getState },
  ) => {
    const { issueKey, text } = params;
    const state = getState() as { chat: ChatState };
    const currentMessages = state.chat.messagesByIssue[issueKey] || [];

    const userMsg: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...currentMessages, userMsg];

    return { issueKey, userMsg, updatedMessages };
  },
);

export const getAssistantResponse = createAsyncThunk(
  'chat/getAssistantResponse',
  async (params: {
    issueKey: string;
    issueTitle?: string;
    issueTags?: string[];
    updatedMessages: ChatMessage[];
  }) => {
    const { issueKey, issueTitle, issueTags, updatedMessages } = params;
    const response = await sendChat({
      issueKey,
      issueTitle,
      issueTags,
      messages: updatedMessages,
    });

    return { issueKey, assistantMsg: { role: 'assistant' as const, content: response.text } };
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChat: (state, action: PayloadAction<string>) => {
      state.messagesByIssue[action.payload] = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { issueKey, userMsg } = action.payload;
        if (!state.messagesByIssue[issueKey]) {
          state.messagesByIssue[issueKey] = [];
        }
        state.messagesByIssue[issueKey].push(userMsg);
      })
      .addCase(getAssistantResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssistantResponse.fulfilled, (state, action) => {
        state.loading = false;
        const { issueKey, assistantMsg } = action.payload;
        if (!state.messagesByIssue[issueKey]) {
          state.messagesByIssue[issueKey] = [];
        }
        state.messagesByIssue[issueKey].push(assistantMsg);
      })
      .addCase(getAssistantResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send message';
      });
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
