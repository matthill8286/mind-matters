import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MindfulEntry } from '@/lib/types';
import { apiFetch } from '@/lib/api';
import { createLoadingSlice, LoadingState, SliceCreator } from '@/lib/zustand-helpers';

interface MindfulnessState {
  mindfulnessHistory: MindfulEntry[];
  error: string | null;
}

interface MindfulnessActions {
  fetchMindfulnessHistory: () => Promise<void>;
  addMindfulMinutes: (seconds: number, note?: string) => Promise<MindfulEntry>;
  clearMindfulness: () => void;
}

type MindfulnessStore = MindfulnessState & MindfulnessActions & LoadingState;

const createMindfulnessSlice: SliceCreator<MindfulnessState & MindfulnessActions, LoadingState> = (
  set,
  get,
  api,
) => ({
  mindfulnessHistory: [],
  error: null,

  fetchMindfulnessHistory: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchMindfulnessHistory');
    set({ error: null });
    try {
      const items = await apiFetch<MindfulEntry[]>('/mindfulness');
      set({ mindfulnessHistory: items });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('fetchMindfulnessHistory');
    }
  },

  addMindfulMinutes: async (seconds, note) => {
    const item = await apiFetch<MindfulEntry>('/mindfulness', {
      method: 'POST',
      body: JSON.stringify({ seconds, note }),
    });
    set((state) => ({ mindfulnessHistory: [item, ...state.mindfulnessHistory] }));
    return item;
  },

  clearMindfulness: () => set({ mindfulnessHistory: [] }),
});

export const useMindfulnessStore = create<MindfulnessStore>()(
  persist(
    (set, get, api) => ({
      ...createMindfulnessSlice(set, get, api),
      ...createLoadingSlice(set, get, api),
    }),
    {
      name: 'mindfulness-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        mindfulnessHistory: state.mindfulnessHistory,
      }),
    },
  ),
);
