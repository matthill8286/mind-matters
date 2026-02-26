import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SleepEntry } from '@/lib/types';
import { apiFetch } from '@/lib/api';
import { createLoadingSlice, LoadingState, SliceCreator } from '@/lib/zustand-helpers';

interface SleepModeState {
  sleepModeStartISO: string | null;
  suggestedWakeISO: string | null;
  autoDetectionEnabled: boolean;
}

interface SleepState {
  sleepEntries: SleepEntry[];
  sleepMode: SleepModeState;
  error: string | null;
}

interface SleepActions {
  fetchSleepEntries: () => Promise<void>;
  addSleepEntry: (
    input: Omit<SleepEntry, 'id' | 'createdAtISO'> &
      Partial<Pick<SleepEntry, 'id' | 'createdAtISO'>>,
  ) => Promise<SleepEntry>;
  deleteSleepEntry: (id: string) => Promise<void>;
  setSleepMode: (mode: Partial<SleepModeState>) => void;
  clearSleep: () => void;
}

type SleepStore = SleepState & SleepActions & LoadingState;

const createSleepSlice: SliceCreator<SleepState & SleepActions, LoadingState> = (
  set,
  get,
  api,
) => ({
  sleepEntries: [],
  sleepMode: {
    sleepModeStartISO: null,
    suggestedWakeISO: null,
    autoDetectionEnabled: false,
  },
  error: null,

  fetchSleepEntries: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchSleepEntries');
    set({ error: null });
    try {
      const items = await apiFetch<SleepEntry[]>('/sleep');
      console.log('fetched sleep entries', items);
      set({ sleepEntries: items });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('fetchSleepEntries');
    }
  },

  addSleepEntry: async (input) => {
    const { id, createdAtISO, ...body } = input;
    console.log('adding sleep entry', body);
    const item = await apiFetch<SleepEntry>('/sleep', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    set((state) => ({ sleepEntries: [item, ...state.sleepEntries] }));
    return item;
  },

  deleteSleepEntry: async (id) => {
    await apiFetch<void>(`/sleep/${id}`, { method: 'DELETE' });
    set((state) => ({
      sleepEntries: state.sleepEntries.filter((i) => i.id !== id),
    }));
  },

  setSleepMode: (mode) => set((state) => ({ sleepMode: { ...state.sleepMode, ...mode } })),

  clearSleep: () =>
    set({
      sleepEntries: [],
      sleepMode: {
        sleepModeStartISO: null,
        suggestedWakeISO: null,
        autoDetectionEnabled: false,
      },
    }),
});

export const useSleepStore = create<SleepStore>()(
  persist(
    (set, get, api) => ({
      ...createSleepSlice(set, get, api),
      ...createLoadingSlice(set, get, api),
    }),
    {
      name: 'sleep-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        sleepEntries: state.sleepEntries,
        sleepMode: state.sleepMode,
      }),
    },
  ),
);
