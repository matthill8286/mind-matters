import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodCheckIn } from '@/lib/types';
import { apiFetch } from '@/lib/api';
import { createLoadingSlice, LoadingState, SliceCreator } from '@/lib/zustand-helpers';

interface MoodState {
  moodCheckIns: MoodCheckIn[];
  error: string | null;
}

interface MoodActions {
  fetchMoodCheckIns: () => Promise<void>;
  addMoodCheckIn: (
    input: Omit<MoodCheckIn, 'id' | 'createdAt'> & Partial<Pick<MoodCheckIn, 'id' | 'createdAt'>>,
  ) => Promise<MoodCheckIn>;
  deleteMoodCheckIn: (id: string) => Promise<void>;
  clearMood: () => void;
}

type MoodStore = MoodState & MoodActions & LoadingState;

const createMoodSlice: SliceCreator<MoodState & MoodActions, LoadingState> = (set, get, api) => ({
  moodCheckIns: [],
  error: null,

  fetchMoodCheckIns: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchMoodCheckIns');
    set({ error: null });
    try {
      const items = await apiFetch<MoodCheckIn[]>('/mood');
      set({ moodCheckIns: items });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('fetchMoodCheckIns');
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

  clearMood: () => set({ moodCheckIns: [] }),
});

export const useMoodStore = create<MoodStore>()(
  persist(
    (set, get, api) => ({
      ...createMoodSlice(set, get, api),
      ...createLoadingSlice(set, get, api),
    }),
    {
      name: 'mood-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        moodCheckIns: state.moodCheckIns,
      }),
    },
  ),
);
