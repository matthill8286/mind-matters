import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '@/lib/types';
import { apiFetch } from '@/lib/api';
import { createLoadingSlice, LoadingState, SliceCreator } from '@/lib/zustand-helpers';

interface JournalState {
  journalEntries: JournalEntry[];
  error: string | null;
}

interface JournalActions {
  fetchJournalEntries: () => Promise<void>;
  createJournalEntry: (
    input: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'> &
      Partial<Pick<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>>,
  ) => Promise<JournalEntry>;
  upsertJournalEntry: (entry: JournalEntry) => Promise<JournalEntry>;
  deleteJournalEntry: (id: string) => Promise<void>;
  clearJournal: () => void;
}

type JournalStore = JournalState & JournalActions & LoadingState;

const createJournalSlice: SliceCreator<JournalState & JournalActions, LoadingState> = (
  set,
  get,
  api,
) => ({
  journalEntries: [],
  error: null,

  fetchJournalEntries: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchJournalEntries');
    set({ error: null });
    try {
      const items = await apiFetch<JournalEntry[]>('/journal');
      set({ journalEntries: items });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('fetchJournalEntries');
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

  clearJournal: () => set({ journalEntries: [] }),
});

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get, api) => ({
      ...createJournalSlice(set, get, api),
      ...createLoadingSlice(set, get, api),
    }),
    {
      name: 'journal-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        journalEntries: state.journalEntries,
      }),
    },
  ),
);
