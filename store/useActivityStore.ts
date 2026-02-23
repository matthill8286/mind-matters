import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodCheckIn, JournalEntry, StressCompletion, MindfulEntry, SleepEntry } from '@/lib/types';
import { apiFetch } from '@/lib/api';

interface SleepModeState {
  sleepModeStartISO: string | null;
  suggestedWakeISO: string | null;
}

interface ActivityState {
  moodCheckIns: MoodCheckIn[];
  journalEntries: JournalEntry[];
  stressHistory: StressCompletion[];
  mindfulnessHistory: MindfulEntry[];
  sleepEntries: SleepEntry[];
  sleepMode: SleepModeState;
  isLoading: boolean;
  error: string | null;
}

interface ActivityActions {
  fetchMoodCheckIns: () => Promise<void>;
  addMoodCheckIn: (
    input: Omit<MoodCheckIn, 'id' | 'createdAt'> & Partial<Pick<MoodCheckIn, 'id' | 'createdAt'>>,
  ) => Promise<MoodCheckIn>;
  deleteMoodCheckIn: (id: string) => Promise<void>;

  fetchJournalEntries: () => Promise<void>;
  createJournalEntry: (
    input: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'> &
      Partial<Pick<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>>,
  ) => Promise<JournalEntry>;
  upsertJournalEntry: (entry: JournalEntry) => Promise<JournalEntry>;
  deleteJournalEntry: (id: string) => Promise<void>;

  fetchStressHistory: () => Promise<void>;
  addStressCompletion: (exerciseId: string, title: string) => Promise<StressCompletion>;

  fetchMindfulnessHistory: () => Promise<void>;
  addMindfulMinutes: (seconds: number, note?: string) => Promise<MindfulEntry>;

  fetchSleepEntries: () => Promise<void>;
  addSleepEntry: (
    input: Omit<SleepEntry, 'id' | 'createdAtISO'> &
      Partial<Pick<SleepEntry, 'id' | 'createdAtISO'>>,
  ) => Promise<SleepEntry>;
  deleteSleepEntry: (id: string) => Promise<void>;
  setSleepMode: (mode: SleepModeState) => void;

  clearActivity: () => void;
}

export const useActivityStore = create<ActivityState & ActivityActions>()(
  persist(
    (set, get) => ({
      moodCheckIns: [],
      journalEntries: [],
      stressHistory: [],
      mindfulnessHistory: [],
      sleepEntries: [],
      sleepMode: {
        sleepModeStartISO: null,
        suggestedWakeISO: null,
      },
      isLoading: false,
      error: null,

      fetchMoodCheckIns: async () => {
        set({ isLoading: true, error: null });
        try {
          const items = await apiFetch<MoodCheckIn[]>('/mood');
          set({ moodCheckIns: items, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      addMoodCheckIn: async (input) => {
        const { id, createdAt, ...body } = input;
        const item = await apiFetch<MoodCheckIn>('/mood', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        set((state) => ({ moodCheckIns: [item, ...state.moodCheckIns] }));
        return item;
      },

      deleteMoodCheckIn: async (id) => {
        await apiFetch<void>(`/mood/${id}`, { method: 'DELETE' });
        set((state) => ({
          moodCheckIns: state.moodCheckIns.filter((i) => i.id !== id),
        }));
      },

      fetchJournalEntries: async () => {
        set({ isLoading: true, error: null });
        try {
          const items = await apiFetch<JournalEntry[]>('/journal');
          set({ journalEntries: items, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      createJournalEntry: async (input) => {
        const { id, createdAt, updatedAt, ...body } = input;
        const entry = await apiFetch<JournalEntry>('/journal', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        set((state) => ({ journalEntries: [entry, ...state.journalEntries] }));
        return entry;
      },

      upsertJournalEntry: async (entry) => {
        const item = await apiFetch<JournalEntry>(`/journal/${entry.id}`, {
          method: 'PUT',
          body: JSON.stringify(entry),
        });
        set((state) => {
          const idx = state.journalEntries.findIndex((e) => e.id === entry.id);
          if (idx >= 0) {
            const next = [...state.journalEntries];
            next[idx] = item;
            return { journalEntries: next };
          }
          return { journalEntries: [item, ...state.journalEntries] };
        });
        return item;
      },

      deleteJournalEntry: async (id) => {
        await apiFetch<void>(`/journal/${id}`, { method: 'DELETE' });
        set((state) => ({
          journalEntries: state.journalEntries.filter((e) => e.id !== id),
        }));
      },

      fetchStressHistory: async () => {
        set({ isLoading: true, error: null });
        try {
          const items = await apiFetch<StressCompletion[]>('/stress/history');
          set({ stressHistory: items, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
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

      fetchMindfulnessHistory: async () => {
        set({ isLoading: true, error: null });
        try {
          const items = await apiFetch<MindfulEntry[]>('/mindfulness');
          set({ mindfulnessHistory: items, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
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

      fetchSleepEntries: async () => {
        set({ isLoading: true, error: null });
        try {
          const items = await apiFetch<SleepEntry[]>('/sleep');
          set({ sleepEntries: items, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      addSleepEntry: async (input) => {
        const { id, createdAtISO, ...body } = input;
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

      setSleepMode: (mode) => set({ sleepMode: mode }),

      clearActivity: () =>
        set({
          moodCheckIns: [],
          journalEntries: [],
          stressHistory: [],
          mindfulnessHistory: [],
          sleepEntries: [],
          sleepMode: {
            sleepModeStartISO: null,
            suggestedWakeISO: null,
          },
        }),
    }),
    {
      name: 'activity-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        moodCheckIns: state.moodCheckIns,
        journalEntries: state.journalEntries,
        stressHistory: state.stressHistory,
        mindfulnessHistory: state.mindfulnessHistory,
        sleepEntries: state.sleepEntries,
        sleepMode: state.sleepMode,
      }),
    },
  ),
);
