import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StressKit } from '@/lib/types';
import { DEFAULT_KIT } from '@/lib/types';
import { apiFetch } from '@/lib/api';

interface StressState {
  stressKit: StressKit | null;
  isLoading: boolean;
  error: string | null;
}

interface StressActions {
  fetchStressKit: () => Promise<void>;
  saveStressKit: (kit: StressKit) => Promise<void>;
  clearStress: () => void;
}

const KIT_KEY = 'stress:kit:v1';

export const useStressStore = create<StressState & StressActions>()(
  persist(
    (set, get) => ({
      stressKit: null,
      isLoading: false,
      error: null,

      fetchStressKit: async () => {
        set({ isLoading: true, error: null });
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
          set({ stressKit: kit, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
          // Fallback default if nothing cached
          set((state) => ({ stressKit: state.stressKit || DEFAULT_KIT }));
        }
      },

      saveStressKit: async (kit: StressKit) => {
        set({ isLoading: true, error: null });
        try {
          const updated = await apiFetch<StressKit>('/stress/kit', {
            method: 'PUT',
            body: JSON.stringify(kit),
          });
          await AsyncStorage.setItem(KIT_KEY, JSON.stringify(updated));
          set({ stressKit: updated, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      clearStress: () => set({ stressKit: null }),
    }),
    {
      name: 'stress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ stressKit: state.stressKit }),
    },
  ),
);
