import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StressCompletion } from '@/lib/types';
import { apiFetch } from '@/lib/api';
import { createLoadingSlice, LoadingState, SliceCreator } from '@/lib/zustand-helpers';

interface StressHistoryState {
  stressHistory: StressCompletion[];
  error: string | null;
}

interface StressHistoryActions {
  fetchStressHistory: () => Promise<void>;
  addStressCompletion: (exerciseId: string, title: string) => Promise<StressCompletion>;
  clearStressHistory: () => void;
}

type StressHistoryStore = StressHistoryState & StressHistoryActions & LoadingState;

const createStressHistorySlice: SliceCreator<
  StressHistoryState & StressHistoryActions,
  LoadingState
> = (set, get, api) => ({
  stressHistory: [],
  error: null,

  fetchStressHistory: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchStressHistory');
    set({ error: null });
    try {
      const items = await apiFetch<StressCompletion[]>('/stress/history');
      set({ stressHistory: items });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('fetchStressHistory');
    }
  },

  addStressCompletion: async (exerciseId, title) => {
    const item = await apiFetch<StressCompletion>('/stress/history', {
      method: 'POST',
      body: JSON.stringify({ exerciseId, title }),
    });
    set((state) => ({ stressHistory: [item, ...state.stressHistory] }));
    return item;
  },

  clearStressHistory: () => set({ stressHistory: [] }),
});

export const useStressHistoryStore = create<StressHistoryStore>()(
  persist(
    (set, get, api) => ({
      ...createStressHistorySlice(set, get, api),
      ...createLoadingSlice(set, get, api),
    }),
    {
      name: 'stress-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        stressHistory: state.stressHistory,
      }),
    },
  ),
);
