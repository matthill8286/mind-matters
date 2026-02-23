import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatMessage } from '@/lib/types';
import { apiFetch } from '@/lib/api';

interface ChatState {
  // Map of issueKey to message history
  history: Record<string, ChatMessage[]>;
  isLoading: boolean;
  error: string | null;
}

interface ChatActions {
  fetchHistory: (issueKey: string) => Promise<void>;
  fetchAllHistories: () => Promise<void>;
  addMessage: (issueKey: string, message: ChatMessage) => Promise<void>;
  clearHistory: (issueKey: string) => Promise<void>;
  clearAllChat: () => void;
}

const CHAT_HISTORY_KEY = 'chat:history:v1';

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      history: {},
      isLoading: false,
      error: null,

      fetchHistory: async (issueKey: string) => {
        set({ isLoading: true, error: null });
        try {
          // Load cached first for instant UI
          const cachedRaw = await AsyncStorage.getItem(`${CHAT_HISTORY_KEY}:${issueKey}`);
          if (cachedRaw) {
            const cached = JSON.parse(cachedRaw) as ChatMessage[];
            set((state) => ({ history: { ...state.history, [issueKey]: cached } }));
          }
          // Fetch from API
          const messages = await apiFetch<ChatMessage[]>(
            `/chat/history/${encodeURIComponent(issueKey)}`,
          );
          await AsyncStorage.setItem(`${CHAT_HISTORY_KEY}:${issueKey}`, JSON.stringify(messages));
          set((state) => ({
            history: { ...state.history, [issueKey]: messages },
            isLoading: false,
          }));
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      fetchAllHistories: async () => {
        set({ isLoading: true, error: null });
        try {
          // This endpoint should return Record<string, ChatMessage[]> or similar
          const allHistory = await apiFetch<Record<string, ChatMessage[]>>('/chat/history');
          // Update all cached histories
          for (const [key, msgs] of Object.entries(allHistory)) {
            await AsyncStorage.setItem(`${CHAT_HISTORY_KEY}:${key}`, JSON.stringify(msgs));
          }
          set({ history: allHistory, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      addMessage: async (issueKey: string, message: ChatMessage) => {
        const { history } = get();
        const currentMessages = history[issueKey] || [];
        const updatedMessages = [...currentMessages, message];

        // Optimistic update
        set((state) => ({ history: { ...state.history, [issueKey]: updatedMessages } }));
        await AsyncStorage.setItem(
          `${CHAT_HISTORY_KEY}:${issueKey}`,
          JSON.stringify(updatedMessages),
        );

        try {
          await apiFetch<void>(`/chat/history/${encodeURIComponent(issueKey)}`, {
            method: 'POST',
            body: JSON.stringify(message),
          });
        } catch (err) {
          // Rollback on failure
          console.error('Failed to append chat message to server:', err);
          set((state) => ({ history: { ...state.history, [issueKey]: currentMessages } }));
          await AsyncStorage.setItem(
            `${CHAT_HISTORY_KEY}:${issueKey}`,
            JSON.stringify(currentMessages),
          );
        }
      },

      clearHistory: async (issueKey: string) => {
        set((state) => ({ history: { ...state.history, [issueKey]: [] } }));
        await AsyncStorage.removeItem(`${CHAT_HISTORY_KEY}:${issueKey}`);
        try {
          await apiFetch<void>(`/chat/history/${encodeURIComponent(issueKey)}`, {
            method: 'DELETE',
          });
        } catch (err) {
          console.error('Failed to clear chat history on server:', err);
        }
      },

      clearAllChat: () => set({ history: {} }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        history: state.history,
      }),
    },
  ),
);
