import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StressKit } from '@/lib/types';
import { DEFAULT_KIT } from '@/lib/types';
import { apiFetch } from '@/lib/api';

import { createLoadingSlice, LoadingState, SliceCreator } from '@/lib/zustand-helpers';

interface StressState {
  stressKit: StressKit | null;
  error: string | null;
}

interface StressActions {
  fetchStressKit: () => Promise<void>;
  saveStressKit: (kit: StressKit) => Promise<void>;
  clearStress: () => void;
}

type StressStore = StressState & StressActions & LoadingState;

const KIT_KEY = 'stress:kit:v1';

const createStressSlice: SliceCreator<StressState & StressActions, LoadingState> = (
  set,
  get,
  api,
) => ({
  stressKit: null,
  error: null,

  fetchStressKit: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchStressKit');
    set({ error: null });
    try {
      // Try load from cache first for instant UI
      const cachedRaw = await AsyncStorage.getItem(KIT_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as StressKit;
        set({ stressKit: cached });
      }
      // Refresh from server
      const kit = await apiFetch<StressKit>('/stress/kit');
      await AsyncStorage.setItem(KIT_KEY, JSON.stringify(kit));
      set({ stressKit: kit });
    } catch (err) {
      set({ error: (err as Error).message });
      // Fallback default if nothing cached
      set((state) => ({ stressKit: state.stressKit || DEFAULT_KIT }));
    } finally {
      stopLoading('fetchStressKit');
    }
  },

  saveStressKit: async (kit: StressKit) => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('saveStressKit');
    set({ error: null });
    try {
      const updated = await apiFetch<StressKit>('/stress/kit', {
        method: 'PUT',
        body: JSON.stringify(kit),
      });
      await AsyncStorage.setItem(KIT_KEY, JSON.stringify(updated));
      set({ stressKit: updated });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('saveStressKit');
    }
  },

  clearStress: () => set({ stressKit: null }),
});

export const useStressStore = create<StressStore>()(
  persist(
    (set, get, api) => ({
      ...createStressSlice(set, get, api),
      ...createLoadingSlice(set, get, api),
    }),
    {
      name: 'stress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ stressKit: state.stressKit }),
    },
  ),
);
